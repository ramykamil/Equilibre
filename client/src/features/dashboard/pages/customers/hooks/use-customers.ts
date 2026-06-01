import { useState, useMemo, useEffect } from "react";
import { Customer, CustomerFilters } from "@/features/dashboard/pages/customers/types/customer";
import { mockCustomers } from "../data/mock-customers";
import { supabase } from "@/lib/supabase";
import {
  SortingState,
  PaginationState,
  OnChangeFn,
} from "@tanstack/react-table";

interface UseCustomersProps {
  initialCustomers?: Customer[];
}

export function useCustomers({ initialCustomers = mockCustomers }: UseCustomersProps = {}) {
  const [customersList, setCustomersList] = useState<Customer[]>(initialCustomers);
  const [loading, setLoading] = useState(true);
  const [usingLiveDb, setUsingLiveDb] = useState(false);

  const [filters, setFilters] = useState<CustomerFilters>({
    status: "all",
    search: "",
    dateRange: {
      from: undefined,
      to: undefined,
    },
  });

  const [sorting, setSorting] = useState<SortingState>([
    { id: "dateJoined", desc: true },
  ]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    async function loadPatients() {
      try {
        const { data, error } = await supabase
          .from("confidential_dossiers")
          .select("*");

        if (error) throw error;

        if (data && data.length > 0) {
          // Map Supabase rows to client model
          const mapped: Customer[] = data.map((item: any, idx: number) => ({
            id: item.id,
            dossierNumber: `DOS-2026-0${idx + 1}`,
            fullName: item.patient_name || "Patient Algérien",
            email: item.patient_email || "patient@equilibre.dz",
            phone: item.patient_phone || "+213 550 00 00 00",
            secureHash: item.secure_key_hash || "eq_sec_default",
            doctorSharingAuthorized: item.doctor_sharing_authorized || false,
            problemType: item.problem_type || "Troubles Divers",
            psychometricScore: item.psychometric_score || "N/A",
            status: (item.status as any) || "active",
            dateJoined: item.created_at,
            lastSession: item.updated_at,
            location: item.location || "Alger, Algérie",
          }));
          setCustomersList(mapped);
          setUsingLiveDb(true);
        }
      } catch (err) {
        console.warn("Could not load live dossiers, falling back to mock Algerian data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPatients();
  }, []);

  const filteredCustomers = useMemo(() => {
    return customersList.filter((customer) => {
      // Status filter
      if (filters.status !== "all" && customer.status !== filters.status) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const searchableFields = [
          customer.dossierNumber,
          customer.fullName,
          customer.email,
          customer.problemType,
          customer.location,
        ].map((field) => field.toLowerCase());

        if (!searchableFields.some((field) => field.includes(searchLower))) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const customerJoinDate = new Date(customer.dateJoined);
        if (filters.dateRange.from && customerJoinDate < filters.dateRange.from) {
          return false;
        }
        if (filters.dateRange.to && customerJoinDate > filters.dateRange.to) {
          return false;
        }
      }

      return true;
    });
  }, [customersList, filters]);

  // For TanStack table, handle pagination and sorting separately
  const paginatedAndSortedCustomers = useMemo(() => {
    if (filteredCustomers.length === 0) return [];

    if (sorting.length === 0) {
      const startIdx = pagination.pageIndex * pagination.pageSize;
      const endIdx = startIdx + pagination.pageSize;
      return filteredCustomers.slice(startIdx, endIdx);
    }

    const compareValues = (
      a: any,
      b: any,
      desc: boolean
    ): number => {
      const direction = desc ? -1 : 1;

      if (typeof a === "boolean" && typeof b === "boolean") {
        return (a === b ? 0 : a ? 1 : -1) * direction;
      }

      if (a === b) return 0;
      if (a == null) return direction;
      if (b == null) return -direction;

      if (typeof a === "string" && typeof b === "string") {
        const isDateA = /^\d{4}-\d{2}-\d{2}(T|\s)/.test(a);
        const isDateB = /^\d{4}-\d{2}-\d{2}(T|\s)/.test(b);

        if (isDateA && isDateB) {
          const dateA = new Date(a).getTime();
          const dateB = new Date(b).getTime();
          return (dateA - dateB) * direction;
        }

        return a.localeCompare(b) * direction;
      }

      if (typeof a === "number" && typeof b === "number") {
        return (a - b) * direction;
      }

      return String(a).localeCompare(String(b)) * direction;
    };

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
      for (const sort of sorting) {
        const key = sort.id as keyof Customer;
        const compared = compareValues(a[key], b[key], sort.desc);
        if (compared !== 0) return compared;
      }
      return 0;
    });

    const startIdx = pagination.pageIndex * pagination.pageSize;
    const endIdx = startIdx + pagination.pageSize;
    return sortedCustomers.slice(startIdx, endIdx);
  }, [filteredCustomers, sorting, pagination]);

  const updateFilters = (newFilters: Partial<CustomerFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    setSorting(
      updaterOrValue instanceof Function
        ? updaterOrValue(sorting)
        : updaterOrValue
    );
  };

  const handlePaginationChange: OnChangeFn<PaginationState> = (
    updaterOrValue
  ) => {
    setPagination(
      updaterOrValue instanceof Function
        ? updaterOrValue(pagination)
        : updaterOrValue
    );
  };

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      search: "",
      dateRange: { from: undefined, to: undefined },
    });
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return {
    allCustomers: filteredCustomers,
    customers: paginatedAndSortedCustomers,
    pageCount: Math.ceil(filteredCustomers.length / pagination.pageSize),
    filters,
    sorting,
    pagination,
    loading,
    usingLiveDb,
    updateFilters,
    handleSortingChange,
    handlePaginationChange,
    handleClearFilters,
  };
}