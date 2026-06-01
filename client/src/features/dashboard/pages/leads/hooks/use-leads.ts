import { useState, useMemo, useEffect } from "react";
import { Lead, LeadFilters } from "@/features/dashboard/pages/leads/types/lead";
import { mockLeads } from "../data/mock-leads";
import { supabase } from "@/lib/supabase";
import {
  SortingState,
  PaginationState,
  OnChangeFn,
} from "@tanstack/react-table";

interface UseLeadsProps {
  initialLeads?: Lead[];
}

export function useLeads({ initialLeads = mockLeads }: UseLeadsProps = {}) {
  const [leadsList, setLeadsList] = useState<Lead[]>(initialLeads);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<LeadFilters>({
    status: "all",
    search: "",
    dateRange: {
      from: undefined,
      to: undefined,
    },
  });

  const [sorting, setSorting] = useState<SortingState>([
    { id: "date", desc: true },
  ]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    async function loadAppointments() {
      try {
        const { data, error } = await supabase
          .from("appointments")
          .select("*");

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped: Lead[] = data.map((item: any, idx: number) => ({
            id: item.id,
            leadNumber: `RDV-2026-0${idx + 1}`,
            fullName: item.patient_name || "Patient Algérien",
            email: item.patient_email || "patient@equilibre.dz",
            phone: item.patient_phone || "+213 550 00 00 00",
            company: item.problem_type || "Coaching & Harmonie",
            value: Number(item.price || 3500),
            status: item.status || "new",
            date: item.scheduled_at,
            source: "website",
          }));
          setLeadsList(mapped);
        }
      } catch (err) {
        console.warn("Could not load live appointments, using mock Algerian data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAppointments();
  }, []);

  const filteredLeads = useMemo(() => {
    return leadsList.filter((lead) => {
      // Status filter
      if (filters.status !== "all" && lead.status !== filters.status) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const searchableFields = [
          lead.leadNumber,
          lead.fullName,
          lead.email,
          lead.company,
        ].map((field) => field.toLowerCase());

        if (!searchableFields.some((field) => field.includes(searchLower))) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const leadDate = new Date(lead.date);
        if (filters.dateRange.from && leadDate < filters.dateRange.from) {
          return false;
        }
        if (filters.dateRange.to && leadDate > filters.dateRange.to) {
          return false;
        }
      }

      return true;
    });
  }, [leadsList, filters]);

  // For TanStack table, handle pagination and sorting separately
  const paginatedAndSortedLeads = useMemo(() => {
    if (filteredLeads.length === 0) return [];

    if (sorting.length === 0) {
      const startIdx = pagination.pageIndex * pagination.pageSize;
      const endIdx = startIdx + pagination.pageSize;
      return filteredLeads.slice(startIdx, endIdx);
    }

    const compareValues = (
      a: any,
      b: any,
      desc: boolean
    ): number => {
      const direction = desc ? -1 : 1;

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

    const sortedLeads = [...filteredLeads].sort((a, b) => {
      for (const sort of sorting) {
        const key = sort.id as keyof Lead;
        const compared = compareValues(a[key], b[key], sort.desc);
        if (compared !== 0) return compared;
      }
      return 0;
    });

    const startIdx = pagination.pageIndex * pagination.pageSize;
    const endIdx = startIdx + pagination.pageSize;
    return sortedLeads.slice(startIdx, endIdx);
  }, [filteredLeads, sorting, pagination]);

  const updateFilters = (newFilters: Partial<LeadFilters>) => {
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
    allLeads: filteredLeads,
    leads: paginatedAndSortedLeads,
    pageCount: Math.ceil(filteredLeads.length / pagination.pageSize),
    filters,
    sorting,
    pagination,
    loading,
    updateFilters,
    handleSortingChange,
    handlePaginationChange,
    handleClearFilters,
  };
}