"use client";

// External dependencies
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIsClient } from "@uidotdev/usehooks";
import { supabase } from "@/lib/supabase";

// Internal components
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar/app-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { Separator } from "@/components/ui/separator";
import { DashboardSkeleton } from "./dashboard-skeleton";

/**
 * Props interface for DashboardLayoutWrapper component
 */
type Props = {
  children: React.ReactNode;
};

/**
 * DashboardLayoutWrapper Component
 *
 * Main layout wrapper for dashboard pages.
 * Handles sidebar state, auth verification, and provides the basic layout
 * structure with sidebar, header, and content area.
 *
 * @param {Props} props - Component props
 * @param {React.ReactNode} props.children - Content to render in the main area
 */
function DashboardLayoutWrapper({ children }: Props) {
  const isClient = useIsClient();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Auth guard: check for valid Supabase session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.replace("/");
          return;
        }
        setIsAuthenticated(true);
      } catch {
        router.replace("/");
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, [router]);

  // Get sidebar open state from localStorage, with fallback to true
  const isOpen = isClient
    ? localStorage.getItem("sidebar-open")
      ? localStorage.getItem("sidebar-open") === "true"
      : true
    : true;

  // Show skeleton during auth check or initial client-side rendering
  if (!isClient || isCheckingAuth || !isAuthenticated) {
    return <DashboardSkeleton />;
  }

  return (
    <SidebarProvider defaultOpen={isOpen}>
      <AppSidebar id="main-sidebar" />
      <SidebarInset
        className="flex flex-col md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0"
        role="main"
      >
        <DashboardHeader />
        <Separator className="bg-secondary" aria-hidden="true" />
        <div
          className="flex-1 overflow-auto p-4 flex flex-col justify-between"
          aria-label="Dashboard content"
        >
          <div className="flex-1">{children}</div>
          <footer className="mt-8 pt-4 border-t border-border/30 text-center text-xs text-muted-foreground space-y-1.5">
            <p className="font-bold text-primary tracking-wide text-xs">
              Sous la Direction de Nabila Hamard — Fondatrice &amp; Directrice Générale de l&apos;Écosystème Équilibre
            </p>
            <p className="text-muted-foreground">
              Développé par <span className="font-semibold text-foreground">Ramy Kamil Mecheri</span>. Tous droits réservés.
            </p>
            <p className="text-muted-foreground">
              ramy.mecherim2@gmail.com | +213 664 97 59 83
            </p>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayoutWrapper;
