"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, LineChart, TrendingUp, Users, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/translation-provider";
import { supabase } from "@/lib/supabase";
import { AuthModal } from "./auth-modal";

export function Hero() {
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <section className="relative overflow-hidden" id="home" aria-labelledby="hero-heading">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" aria-hidden="true" />
      <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
      <div className="bg-primary/20 absolute bottom-16 left-0 -z-10 h-36 w-36 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-32 sm:px-6 sm:py-40 md:min-h-[85vh] lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="border-border bg-background mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
            <span className="bg-primary flex h-2 w-2 rounded-full" aria-hidden="true" />
            <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
              Algeria • DZD / DA
            </span>
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            {t("landingHeroTitle")}
          </h1>

          <p className="text-muted-foreground mt-6 max-w-2xl text-center text-lg md:text-xl">
            {t("landingHeroSubtitle")}
          </p>

          <div className="relative mt-10 flex flex-col gap-4 sm:flex-row">
            {user ? (
              <Link href="/dashboard/overview">
                <Button size="lg" className="h-16 px-8 text-base font-semibold tracking-wide uppercase">
                  {t("dashboard")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                onClick={() => setIsAuthOpen(true)}
                className="h-16 px-8 text-base font-semibold tracking-wide uppercase cursor-pointer"
              >
                {t("getStarted")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Stats Bar */}
          <div className="border-border/50 bg-background/50 mt-16 flex flex-wrap items-center justify-center gap-6 rounded-2xl border p-6 shadow-md backdrop-blur-md">
            <div className="text-center px-4">
              <div className="flex items-center justify-center gap-1.5">
                <ShieldAlert className="text-primary h-5 w-5" aria-hidden="true" />
                <p className="text-xl font-bold">100%</p>
              </div>
              <p className="text-muted-foreground text-xs font-medium mt-1">
                Chiffrement RGPD / HDS
              </p>
            </div>
            <div className="text-center px-4 border-l border-border/50">
              <div className="flex items-center justify-center gap-1.5">
                <LineChart className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                <p className="text-xl font-bold">DZD / DA</p>
              </div>
              <p className="text-muted-foreground text-xs font-medium mt-1">
                Paiement local algérien
              </p>
            </div>
            <div className="text-center px-4 border-l border-border/50">
              <div className="flex items-center justify-center gap-1.5">
                <Users className="h-5 w-5 text-green-500" aria-hidden="true" />
                <p className="text-xl font-bold">4 Groupes</p>
              </div>
              <p className="text-muted-foreground text-xs font-medium mt-1">
                Accompagnements dédiés
              </p>
            </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} defaultMode="signup" />
    </section>
  );
}
