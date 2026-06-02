"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useTranslation } from "@/providers/translation-provider";
import { cn } from "@/lib/utils";
import { AuthModal } from "./auth-modal";
import { supabase } from "@/lib/supabase";

const NavLink = ({
  href,
  isActive,
  onClick,
  children,
}: {
  href: string;
  isActive: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative rounded-md px-4 py-2 text-sm font-medium tracking-wide transition-all",
        isActive
          ? "bg-primary text-primary-foreground font-semibold"
          : "text-muted-foreground hover:bg-background/80 hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
};

export function Header() {
  const { t, lang } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user-role");
    window.location.reload();
  };

  const navItems = [
    { label: lang === "fr" ? "Accueil" : "Home", hash: "#home" },
    { label: lang === "fr" ? "Avantages" : "Benefits", hash: "#benefits" },
    { label: lang === "fr" ? "Tarifs" : "Pricing", hash: "#pricing" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-background/90 border-border/35 relative rounded-full border shadow-lg backdrop-blur-xl">
            <nav
              className="flex h-16 items-center justify-between px-4 sm:px-6"
              aria-label="Main navigation"
            >
              {/* Logo */}
              <Link href="/" className="group flex items-center gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                    <Zap className="text-primary h-4 w-4" aria-hidden="true" />
                  </div>
                  <span className="text-lg font-bold tracking-tight">
                    {t("brand")}
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden items-center gap-1 md:flex">
                {navItems.map((item) => (
                  <NavLink key={item.hash} href={item.hash} isActive={false}>
                    {item.label}
                  </NavLink>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden items-center gap-3 md:flex">
                <LanguageToggle />
                {user ? (
                  <>
                    <Link href="/dashboard/overview">
                      <Button variant="ghost" className="font-semibold text-sm">
                        {t("dashboard")}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      className="font-semibold text-sm"
                    >
                      {t("logOut")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="font-semibold text-sm"
                      onClick={() => {
                        setAuthMode("login");
                        setIsAuthOpen(true);
                      }}
                    >
                      {t("signIn")}
                    </Button>
                    <Button
                      className="px-4 font-semibold text-sm"
                      onClick={() => {
                        setAuthMode("signup");
                        setIsAuthOpen(true);
                      }}
                    >
                      {t("getStarted")}
                    </Button>
                  </>
                )}

                <ModeToggle />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hover:bg-background/80 rounded-full p-2 transition-colors md:hidden"
                aria-label="Toggle menu"
              >
                <Menu className="text-muted-foreground h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" id="mobile-menu" role="dialog" aria-modal="true">
          <div
            className="bg-background/85 fixed inset-0 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="bg-background/95 border-border/50 fixed inset-x-0 top-0 border-b p-6 pt-24 shadow-xl">
            <div className="flex flex-col gap-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.hash}
                  href={item.hash}
                  isActive={false}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              
              <div className="border-border/50 mt-6 grid grid-cols-2 gap-3 border-t pt-6">
                {user ? (
                  <>
                    <Link href="/dashboard/overview" className="w-full">
                      <Button className="w-full font-semibold">{t("dashboard")}</Button>
                    </Link>
                    <Button variant="outline" className="w-full font-semibold" onClick={handleSignOut}>
                      {t("logOut")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full font-semibold"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setAuthMode("login");
                        setIsAuthOpen(true);
                      }}
                    >
                      {t("signIn")}
                    </Button>
                    <Button
                      className="w-full font-semibold"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setAuthMode("signup");
                        setIsAuthOpen(true);
                      }}
                    >
                      {t("getStarted")}
                    </Button>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between pt-6">
                <LanguageToggle />
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unified Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} defaultMode={authMode} />
    </>
  );
}
