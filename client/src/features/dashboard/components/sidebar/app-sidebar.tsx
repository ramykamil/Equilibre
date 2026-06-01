"use client";

import * as React from "react";
import Link from "next/link";
import { Zap, SquareTerminal, Users, FileText, BarChart, Settings2, HandCoins } from "lucide-react";

import { NavMain } from "@/features/dashboard/components/sidebar/nav-main";
import { NavWorkspace } from "@/features/dashboard/components/sidebar/nav-workspace";
import { NavSecondary } from "@/features/dashboard/components/sidebar/nav-secondary";
import { NavUser } from "@/features/dashboard/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebarMenus } from "@/data/sidebar-menus";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const [activeRole, setActiveRole] = React.useState<"patient" | "professional">("professional");

  React.useEffect(() => {
    localStorage.setItem("sidebar-open", open.toString());
  }, [open]);

  React.useEffect(() => {
    const savedRole = localStorage.getItem("user-role");
    if (savedRole === "patient" || savedRole === "professional") {
      setActiveRole(savedRole);
    }
  }, []);

  const handleRoleChange = (role: "patient" | "professional") => {
    setActiveRole(role);
    localStorage.setItem("user-role", role);
    // Refresh to update dashboard states across pages
    window.location.reload();
  };

  // Define dynamic menu lists based on the active role
  const patientMenus = [
    {
      title: "Mon Espace",
      url: "/dashboard/overview",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Vue d'ensemble",
          url: "/dashboard/overview",
        },
        {
          title: "Journal d'Humeur",
          url: "/dashboard/reports/moods",
        },
      ],
    },
    {
      title: "Mes Rendez-vous",
      url: "/dashboard/leads",
      icon: HandCoins,
      items: [
        {
          title: "Réserver une séance",
          url: "/dashboard/leads/new",
        },
        {
          title: "Mes Consultations",
          url: "/dashboard/leads",
        },
      ],
    },
    {
      title: "Dossier & Tests",
      url: "/dashboard/customers",
      icon: Users,
      items: [
        {
          title: "Mon Dossier Codé",
          url: "/dashboard/customers",
        },
        {
          title: "Passer un Test",
          url: "/dashboard/customers/tests",
        },
      ],
    },
    {
      title: "Mes Factures",
      url: "/dashboard/invoices",
      icon: FileText,
      items: [
        {
          title: "Reçus & Paiements",
          url: "/dashboard/invoices",
        },
      ],
    },
  ];

  const menuItems = activeRole === "professional" ? sidebarMenus.navMain : patientMenus;

  const activeUser = activeRole === "professional" 
    ? sidebarMenus.user 
    : { name: "Ramy Kamil", email: "ramy@example.com", avatar: "/avatars/avatar.png" };

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
      aria-label="Main navigation"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href="/dashboard"
                className="hover:bg-transparent"
                aria-label="Go to dashboard home"
              >
                <div
                  className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                  aria-hidden="true"
                >
                  <Zap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Équilibre</span>
                  <span className="truncate text-xs">Coaching & Thérapie</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems} />
        <NavWorkspace activeRole={activeRole} onRoleChange={handleRoleChange} />
        <NavSecondary items={sidebarMenus.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={activeUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
