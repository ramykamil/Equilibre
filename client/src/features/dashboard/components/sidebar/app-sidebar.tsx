"use client";

import * as React from "react";
import Link from "next/link";
import { Zap, SquareTerminal, Users, FileText, BarChart, Settings2, HandCoins } from "lucide-react";
import { supabase } from "@/lib/supabase";

import { useTranslation } from "@/providers/translation-provider";
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
  const { t } = useTranslation();
  const [activeRole, setActiveRole] = React.useState<"patient" | "professional">("professional");
  const [authUser, setAuthUser] = React.useState<{ name: string; email: string } | null>(null);

  React.useEffect(() => {
    localStorage.setItem("sidebar-open", open.toString());
  }, [open]);

  React.useEffect(() => {
    const savedRole = localStorage.getItem("user-role");
    if (savedRole === "patient" || savedRole === "professional") {
      setActiveRole(savedRole);
    }
  }, []);

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
        setAuthUser({ name: fullName, email: user.email || "" });
      }
    };
    fetchUser();
  }, []);

  const handleRoleChange = (role: "patient" | "professional") => {
    setActiveRole(role);
    localStorage.setItem("user-role", role);
    window.location.reload();
  };

  // Menu lists using Translation Keys
  const patientMenus = [
    {
      title: t("patientSpace"),
      url: "/dashboard/overview",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: t("overview"),
          url: "/dashboard/overview",
        },
        {
          title: t("moodTracking"),
          url: "/dashboard/reports/moods",
        },
      ],
    },
    {
      title: t("myConsultations"),
      url: "/dashboard/leads",
      icon: HandCoins,
      items: [
        {
          title: t("bookSession"),
          url: "/dashboard/leads/new",
        },
        {
          title: t("myConsultations"),
          url: "/dashboard/leads",
        },
      ],
    },
    {
      title: t("codedFiles"),
      url: "/dashboard/customers",
      icon: Users,
      items: [
        {
          title: t("myCodedDossier"),
          url: "/dashboard/customers",
        },
        {
          title: t("takeTest"),
          url: "/dashboard/customers/tests",
        },
      ],
    },
    {
      title: t("billing"),
      url: "/dashboard/invoices",
      icon: FileText,
      items: [
        {
          title: t("receiptsPayments"),
          url: "/dashboard/invoices",
        },
      ],
    },
  ];

  const specialistMenus = [
    {
      title: t("dashboard"),
      url: "/dashboard/overview",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: t("overview"),
          url: "/dashboard/overview",
        },
        {
          title: t("activityLogs"),
          url: "/dashboard/activity-logs",
        },
      ],
    },
    {
      title: t("appointments"),
      url: "/dashboard/leads",
      icon: HandCoins,
      items: [
        {
          title: t("allAppointments"),
          url: "/dashboard/leads",
        },
        {
          title: t("interactiveCalendar"),
          url: "/dashboard/leads/calendar",
        },
        {
          title: t("pendingConsultations"),
          url: "/dashboard/leads/pending",
        },
      ],
    },
    {
      title: t("patientsDossiers"),
      url: "/dashboard/customers",
      icon: Users,
      items: [
        {
          title: t("codedFiles"),
          url: "/dashboard/customers",
        },
        {
          title: t("doctorSharing"),
          url: "/dashboard/customers/segments",
        },
        {
          title: t("psychometricTests"),
          url: "/dashboard/customers/tests",
        },
      ],
    },
    {
      title: t("billing"),
      url: "/dashboard/invoices",
      icon: FileText,
      items: [
        {
          title: t("allInvoices"),
          url: "/dashboard/invoices",
        },
        {
          title: t("pendingPayments"),
          url: "/dashboard/invoices/pending",
        },
        {
          title: t("paidSessions"),
          url: "/dashboard/invoices/paid",
        },
      ],
    },
    {
      title: t("analyticsSuivi"),
      url: "/dashboard/reports/sales",
      icon: BarChart,
      items: [
        {
          title: t("statsConsultations"),
          url: "/dashboard/reports/sales",
        },
        {
          title: t("moodTracking"),
          url: "/dashboard/reports/moods",
        },
        {
          title: t("patientGoals"),
          url: "/dashboard/reports/goals",
        },
      ],
    },
    {
      title: t("configuration"),
      url: "/dashboard/settings/general",
      icon: Settings2,
      items: [
        {
          title: t("general"),
          url: "/dashboard/settings/general",
        },
        {
          title: t("security2fa"),
          url: "/dashboard/settings/users",
        },
        {
          title: t("integrationsHds"),
          url: "/dashboard/settings/integrations",
        },
      ],
    },
  ];

  const menuItems = activeRole === "professional" ? specialistMenus : patientMenus;

  const activeUser = {
    name: authUser?.name || sidebarMenus.user.name,
    email: authUser?.email || sidebarMenus.user.email,
    avatar: "/avatars/avatar.png",
  };

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
                  <span className="truncate font-semibold">{t("brand")}</span>
                  <span className="truncate text-xs">{t("subtitle")}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems} />
        <NavWorkspace activeRole={activeRole} onRoleChange={handleRoleChange} />
        <NavSecondary 
          items={sidebarMenus.navSecondary.map(item => ({
            ...item,
            title: item.title.includes("Aide") ? t("helpUrgency") : t("feedback")
          }))} 
          className="mt-auto" 
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={activeUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
