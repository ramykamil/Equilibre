"use client";

import { useMemo } from "react";
import { Customer, CustomerStatus } from "@/features/dashboard/pages/customers/types/customer";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { CustomerActionsDropdown } from "./customers-actions-dropdown";
import { ShieldCheck, ShieldAlert } from "lucide-react";

export const statusColors: Record<CustomerStatus, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  blocked: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export const useCustomerColumns = () => {
  return useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "dossierNumber",
        header: "Réf Dossier",
        cell: ({ row }) => (
          <div className="font-semibold text-primary">{row.getValue("dossierNumber")}</div>
        ),
      },
      {
        accessorKey: "fullName",
        header: "Patient",
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
        header: "Spécificité / Trouble",
        cell: ({ row }) => <div className="text-sm font-medium">{row.getValue("problemType")}</div>,
      },
      {
        accessorKey: "psychometricScore",
        header: "Score Tests",
        cell: ({ row }) => {
          const score = row.getValue("psychometricScore") as string;
          const isHigh = score.includes("Élevé") || score.includes("Critique");
          return (
            <Badge variant={isHigh ? "destructive" : "secondary"}>
              {score}
            </Badge>
          );
        },
      },
      {
        accessorKey: "doctorSharingAuthorized",
        header: "Partage Médecin",
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
        header: "Code Sécurisé",
        cell: ({ row }) => (
          <code className="text-xs px-2 py-0.5 bg-muted rounded border font-mono">
            {row.getValue("secureHash")}
          </code>
        ),
      },
      {
        accessorKey: "lastSession",
        header: "Dernière Consultation",
        cell: ({ row }) => {
          const lastSession = row.getValue("lastSession") as string;
          return lastSession 
            ? format(new Date(lastSession), "dd/MM/yyyy") 
            : "Aucune séance";
        },
      },
      {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
          const status = row.getValue("status") as CustomerStatus;
          const label = status === "active" ? "Actif" : status === "pending" ? "En attente" : "Inactif";
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
    []
  );
};