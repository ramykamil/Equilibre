"use client";

import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/providers/translation-provider";

export function Pricing() {
  const { t, lang } = useTranslation();

  const tiers = [
    {
      name: t("basicPlan"),
      price: t("priceBasic"),
      description: t("pricingDescBasic"),
      features: lang === "fr" ? [
        "1 diagnostic complet d'orientation",
        "Accompagnement personnalisé",
        "Accès aux tests d'humeur en ligne",
        "Paiement sécurisé en DA/DZD",
      ] : [
        "1 complete diagnostic orientation",
        "Personalized guidance session",
        "Access to online mood assessments",
        "Secure payments in DA/DZD",
      ],
      cta: lang === "fr" ? "Démarrer" : "Start now",
      popular: false,
    },
    {
      name: t("proPlan"),
      price: t("pricePro"),
      description: t("pricingDescPro"),
      features: lang === "fr" ? [
        "Séance de thérapie/coaching de couple ou individuelle",
        "Suivi et rapports d'évolution réguliers",
        "Accès illimité aux tests cliniques",
        "Partage optionnel et sécurisé avec le médecin traitant",
        "Assistance prioritaire",
      ] : [
        "Couples or individual session",
        "Regular evolution tracking & reports",
        "Unlimited access to clinical tests",
        "Optional secure GP sharing",
        "Priority support",
      ],
      cta: lang === "fr" ? "Réserver" : "Book session",
      popular: true,
    },
    {
      name: t("enterprisePlan"),
      price: t("priceEnterprise"),
      description: t("pricingDescEnterprise"),
      features: lang === "fr" ? [
        "Suivi intensif continu",
        "Rapports cliniques détaillés cryptés HDS",
        "Assistance 7j/7 par messagerie",
        "Plans de devoirs et exercices personnalisés",
      ] : [
        "Intensive continuous tracking",
        "Detailed HDS encrypted clinical reports",
        "7d/7 chat assistance",
        "Custom homework assignments & activities",
      ],
      cta: lang === "fr" ? "Nous contacter" : "Contact us",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 sm:py-32" aria-labelledby="pricing-heading">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" aria-hidden="true" />
      <div className="bg-primary/10 absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full blur-3xl" aria-hidden="true" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
            {t("pricingTitle")}
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            {t("pricingSubtitle")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Card
              key={i}
              className={cn(
                "relative flex flex-col justify-between overflow-hidden border transition-all duration-300 hover:shadow-lg rounded-2xl",
                tier.popular
                  ? "border-primary shadow-md"
                  : "border-border/50 hover:border-primary/20",
              )}
            >
              {tier.popular && (
                <div className="absolute -top-10 -right-10 overflow-hidden" aria-label="Popular plan">
                  <div className="bg-primary flex h-32 w-32 translate-x-2 -translate-y-2 rotate-45 items-center justify-center">
                    <span className="text-primary-foreground mt-16 text-xs font-bold uppercase tracking-wider">
                      Popular
                    </span>
                  </div>
                </div>
              )}
              
              <CardHeader className={cn("p-6", tier.popular ? "bg-primary/5" : "")}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    {tier.popular && <Sparkles className="text-primary h-5 w-5 animate-pulse" aria-hidden="true" />}
                    <h3 className="text-xl font-bold tracking-tight">{tier.name}</h3>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold">{tier.price}</span>
                    <span className="text-muted-foreground text-sm font-medium">/{t("perMonth")}</span>
                  </div>
                </div>
                <p className="text-muted-foreground mt-2 text-sm">{tier.description}</p>
              </CardHeader>
              
              <CardContent className="flex-1 p-6 pt-2">
                <ul className="space-y-3" aria-label={`Features for ${tier.name} plan`}>
                  {tier.features.map((feature: string, j: number) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div className="bg-primary/10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" aria-hidden="true">
                        <Check className="text-primary h-3 w-3" />
                      </div>
                      <span className="text-sm leading-tight text-muted-foreground group-hover:text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button
                  className="h-12 w-full font-bold uppercase tracking-wider"
                  size="lg"
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
