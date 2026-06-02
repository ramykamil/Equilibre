"use client";

import { Heart, UserCheck, Accessibility, GraduationCap, ShieldCheck, HelpCircle } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/providers/translation-provider";

export function Features() {
  const { t } = useTranslation();

  const benefits = [
    {
      title: t("couplesTitle"),
      description: t("couplesDesc"),
      icon: <Heart className="h-7 w-7" aria-hidden="true" />,
      bgColor: "rgba(239, 68, 68, 0.1)",
      textColor: "rgb(239, 68, 68)",
    },
    {
      title: t("momsTitle"),
      description: t("momsDesc"),
      icon: <UserCheck className="h-7 w-7" aria-hidden="true" />,
      bgColor: "rgba(168, 85, 247, 0.1)",
      textColor: "rgb(168, 85, 247)",
    },
    {
      title: t("seniorsTitle"),
      description: t("seniorsDesc"),
      icon: <Accessibility className="h-7 w-7" aria-hidden="true" />,
      bgColor: "rgba(34, 197, 94, 0.1)",
      textColor: "rgb(34, 197, 94)",
    },
    {
      title: t("studentsTitle"),
      description: t("studentsDesc"),
      icon: <GraduationCap className="h-7 w-7" aria-hidden="true" />,
      bgColor: "rgba(59, 130, 246, 0.1)",
      textColor: "rgb(59, 130, 246)",
    },
  ];

  return (
    <section id="benefits" className="relative py-24 sm:py-32" aria-labelledby="benefits-heading">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" aria-hidden="true" />
      <div className="absolute top-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
            {t("benefitsTitle")}
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            {t("benefitsSubtitle")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <Card
              key={i}
              className="border-border/50 bg-background/60 hover:border-primary/20 group overflow-hidden rounded-2xl border p-1 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative p-6">
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300"
                  style={{ backgroundColor: benefit.bgColor, color: benefit.textColor }}
                  aria-hidden="true"
                >
                  {benefit.icon}
                </div>
                <CardTitle className="mb-2 text-xl font-bold tracking-tight">
                  {benefit.title}
                </CardTitle>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Clinical Security Highlight */}
        <div className="border-border/50 bg-background/50 mt-24 rounded-2xl border p-8 lg:p-10 shadow-sm backdrop-blur-md">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
            <div
              className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl shrink-0"
              aria-hidden="true"
            >
              <ShieldCheck className="text-primary h-10 w-10" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold tracking-tight uppercase">
                {t("medicalDossier")} &amp; {t("encryptedHds")}
              </h3>
              <p className="text-muted-foreground mt-4 text-base md:text-lg">
                Équilibre est conforme aux exigences de protection des données de santé. Toutes vos notes cliniques, 
                résultats de tests psychométriques et échanges de messagerie sont chiffrés de bout en bout et protégés 
                par authentification forte. Vous choisissez qui a accès à votre dossier de suivi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
