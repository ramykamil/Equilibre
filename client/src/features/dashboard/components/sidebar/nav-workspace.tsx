"use client";

import * as React from "react";
import { User, ShieldAlert, Check } from "lucide-react";
import { useTranslation } from "@/providers/translation-provider";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function NavWorkspace({
  activeRole,
  onRoleChange,
}: {
  activeRole: "patient" | "professional";
  onRoleChange: (role: "patient" | "professional") => void;
}) {
  const { t } = useTranslation();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden" aria-label={t("selectorSpace")}>
      <SidebarGroupLabel>{t("selectorSpace")}</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => onRoleChange("professional")}
            className={`cursor-pointer w-full flex items-center justify-between p-2 rounded-md transition-all ${
              activeRole === "professional"
                ? "bg-primary text-primary-foreground font-semibold"
                : "hover:bg-sidebar-accent"
            }`}
            aria-label="Passer à l'espace Professionnel"
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-4" />
              <span>{t("professionalSpace")}</span>
            </div>
            {activeRole === "professional" && <Check className="size-4" />}
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => onRoleChange("patient")}
            className={`cursor-pointer w-full flex items-center justify-between p-2 rounded-md transition-all ${
              activeRole === "patient"
                ? "bg-primary text-primary-foreground font-semibold"
                : "hover:bg-sidebar-accent"
            }`}
            aria-label="Passer à l'espace Patient"
          >
            <div className="flex items-center gap-2">
              <User className="size-4" />
              <span>{t("patientSpace")}</span>
            </div>
            {activeRole === "patient" && <Check className="size-4" />}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
