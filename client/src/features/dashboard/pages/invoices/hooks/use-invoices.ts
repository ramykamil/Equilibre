import { useState, useMemo, useEffect } from "react";
import { Invoice, InvoiceFilters } from "@/features/dashboard/pages/invoices/types/invoice";
import { mockInvoices } from "../data/mock-invoices";
import { supabase } from "@/lib/supabase";
import {
  SortingState,
  PaginationState,
  OnChangeFn,
} from "@tanstack/react-table";

interface UseInvoicesProps {
  initialInvoices?: Invoice[];
}

export function useInvoices({ initialInvoices = mockInvoices }: UseInvoicesProps = {}) {
  const [invoicesList, setInvoicesList] = useState<Invoice[]>(initialInvoices);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<InvoiceFilters>({
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
    async function loadInvoices() {
      try {
        const { data, error } = await supabase
          .from("invoices")
          .select("*");

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped: Invoice[] = data.map((item: any, idx: number) => ({
            id: item.id,
            invoiceNumber: `INV-2026-0${idx + 1}`,
            customerName: item.patient_name || "Patient Algérien",
            email: item.patient_email || "patient@equilibre.dz",
            amount: Number(item.amount),
            status: item.status || "pending",
            date: item.created_at,
            dueDate: item.created_at,
            items: 1,
            paymentMethod: "credit_card",
          }));
          setInvoicesList(mapped);
        }
      } catch (err) {
        console.warn("Could not load live invoices, using mock Algerian data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInvoices();
  }, []);

  const filteredInvoices = useMemo(() => {
    return invoicesList.filter((invoice) => {
      // Status filter
      if (filters.status !== "all" && invoice.status !== filters.status) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const searchableFields = [
          invoice.invoiceNumber,
          invoice.customerName,
          invoice.email,
        ].map((field) => field.toLowerCase());

        if (!searchableFields.some((field) => field.includes(searchLower))) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const invoiceDate = new Date(invoice.date);
        if (filters.dateRange.from && invoiceDate < filters.dateRange.from) {
          return false;
        }
        if (filters.dateRange.to && invoiceDate > filters.dateRange.to) {
          return false;
        }
      }

      return true;
    });
  }, [invoicesList, filters]);

  // For TanStack table, handle pagination and sorting separately
  const paginatedAndSortedInvoices = useMemo(() => {
    if (filteredInvoices.length === 0) return [];

    if (sorting.length === 0) {
      const startIdx = pagination.pageIndex * pagination.pageSize;
      const endIdx = startIdx + pagination.pageSize;
      return filteredInvoices.slice(startIdx, endIdx);
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

    const sortedInvoices = [...filteredInvoices].sort((a, b) => {
      for (const sort of sorting) {
        const key = sort.id as keyof Invoice;
        const compared = compareValues(a[key], b[key], sort.desc);
        if (compared !== 0) return compared;
      }
      return 0;
    });

    const startIdx = pagination.pageIndex * pagination.pageSize;
    const endIdx = startIdx + pagination.pageSize;
    return sortedInvoices.slice(startIdx, endIdx);
  }, [filteredInvoices, sorting, pagination]);

  const updateFilters = (newFilters: Partial<InvoiceFilters>) => {
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
    allInvoices: filteredInvoices,
    invoices: paginatedAndSortedInvoices,
    pageCount: Math.ceil(filteredInvoices.length / pagination.pageSize),
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