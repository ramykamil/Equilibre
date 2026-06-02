"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { useTranslation } from "@/providers/translation-provider";

export function Footer() {
  const { t, lang } = useTranslation();

  const productLinks = [
    { name: lang === "fr" ? "Avantages" : "Benefits", href: "#benefits" },
    { name: lang === "fr" ? "Tarifs" : "Pricing", href: "#pricing" },
  ];

  const legalLinks = [
    { name: lang === "fr" ? "Confidentialité (HDS)" : "Privacy Policy (HDS)", href: "#" },
    { name: lang === "fr" ? "Conditions d'utilisation" : "Terms of Service", href: "#" },
  ];

  return (
    <footer className="border-border/50 relative border-t py-12 bg-background/90" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-border/50 pb-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
              <Zap className="text-primary h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">{t("brand")}</span>
          </div>

          <div className="flex flex-wrap gap-8 text-sm">
            {productLinks.map((item) => (
              <Link key={item.name} href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {item.name}
              </Link>
            ))}
            {legalLinks.map((item) => (
              <Link key={item.name} href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {t("brand")}. Tous droits réservés.</p>
          <p>Hébergement certifié Données de Santé (HDS)</p>
        </div>
      </div>
    </footer>
  );
}
