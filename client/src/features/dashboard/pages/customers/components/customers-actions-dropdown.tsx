"use client";

import { Customer } from "@/features/dashboard/pages/customers/types/customer";
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash, 
  Mail, 
  FileText,
  Ban,
  UserCheck
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/translation-provider";

interface CustomerActionsProps {
  customer: Customer;
}

export function CustomerActionsDropdown({ customer }: CustomerActionsProps) {
  const { t } = useTranslation();

  const handleViewDetails = () => {
    console.log("View customer details", customer.dossierNumber);
  };

  const handleEditCustomer = () => {
    console.log("Edit customer", customer.dossierNumber);
  };

  const handleSendEmail = () => {
    console.log("Email customer", customer.email);
  };

  const handleViewInvoices = () => {
    console.log("View invoices for", customer.dossierNumber);
  };

  const handleActivateCustomer = () => {
    console.log("Activate customer", customer.dossierNumber);
  };

  const handleBlockCustomer = () => {
    console.log("Block customer", customer.dossierNumber);
  };

  const handleDeleteCustomer = () => {
    console.log("Delete customer", customer.dossierNumber);
  };

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <span className="sr-only">{t("openMenu")}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleViewDetails}>
            <Eye className="mr-2 h-4 w-4" />
            <span>{t("voirDossier")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEditCustomer}>
            <Edit className="mr-2 h-4 w-4" />
            <span>{t("modifier")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleViewInvoices}>
            <FileText className="mr-2 h-4 w-4" />
            <span>{t("voirFactures")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSendEmail}>
            <Mail className="mr-2 h-4 w-4" />
            <span>{t("envoyerMessage")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {(customer.status === "inactive" || customer.status === "blocked") && (
            <DropdownMenuItem onClick={handleActivateCustomer}>
              <UserCheck className="mr-2 h-4 w-4" />
              <span>{t("activer")}</span>
            </DropdownMenuItem>
          )}
          {customer.status !== "blocked" && (
            <DropdownMenuItem onClick={handleBlockCustomer} className="text-amber-600">
              <Ban className="mr-2 h-4 w-4" />
              <span>{t("desactiver")}</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleDeleteCustomer}
            className="text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>{t("supprimer")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}