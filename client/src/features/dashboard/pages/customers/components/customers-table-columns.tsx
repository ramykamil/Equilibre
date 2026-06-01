"use client";

import { useMemo } from "react";
import { Customer, CustomerStatus } from "@/features/dashboard/pages/customers/types/customer";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { CustomerActionsDropdown } from "./customers-actions-dropdown";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { useTranslation } from "@/providers/translation-provider";

export const statusColors: Record<CustomerStatus, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  blocked: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export const useCustomerColumns = () => {
  const { t } = useTranslation();

  return useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "dossierNumber",
        header: t("refDossier"),
        cell: ({ row }) => (
          <div className="font-semibold text-primary">{row.getValue("dossierNumber")}</div>
        ),
      },
      {
        accessorKey: "fullName",
        header: t("patient"),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{row.getValue("fullName")}</span>
            <span className="text-xs text-muted-foreground">
              {row.original.email}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "problemType",
        header: t("trouble"),
        cell: ({ row }) => <div className="text-sm font-medium">{row.getValue("problemType")}</div>,
      },
      {
        accessorKey: "psychometricScore",
        header: t("scoreTests"),
        cell: ({ row }) => {
          const score = row.getValue("psychometricScore") as string;
          const isHigh = score.includes("Élevé") || score.includes("Critique") || score.includes("High") || score.includes("Critical");
          return (
            <Badge variant={isHigh ? "destructive" : "secondary"}>
              {score}
            </Badge>
          );
        },
      },
      {
        accessorKey: "doctorSharingAuthorized",
        header: t("partageMedecin"),
        cell: ({ row }) => {
          const authorized = row.getValue("doctorSharingAuthorized") as boolean;
          return (
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              {authorized ? (
                <>
                  <ShieldCheck className="size-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Autorisé</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Privé</span>
                </>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "secureHash",
        header: t("codeSecurise"),
        cell: ({ row }) => (
          <code className="text-xs px-2 py-0.5 bg-muted rounded border font-mono">
            {row.getValue("secureHash")}
          </code>
        ),
      },
      {
        accessorKey: "lastSession",
        header: t("derniereConsultation"),
        cell: ({ row }) => {
          const lastSession = row.getValue("lastSession") as string;
          return lastSession 
            ? format(new Date(lastSession), "dd/MM/yyyy") 
            : "Aucune séance";
        },
      },
      {
        accessorKey: "status",
        header: t("statut"),
        cell: ({ row }) => {
          const status = row.getValue("status") as CustomerStatus;
          const label = status === "active" ? t("active") : status === "pending" ? t("pending") : t("inactive");
          return (
            <Badge className={statusColors[status]}>
              {label}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => <CustomerActionsDropdown customer={row.original} />,
      },
    ],
    [t]
  );
};