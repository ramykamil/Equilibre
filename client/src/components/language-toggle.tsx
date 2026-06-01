"use client";

import { useTranslation } from "@/providers/translation-provider";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { lang, setLang } = useTranslation();

  const toggleLanguage = () => {
    setLang(lang === "fr" ? "en" : "fr");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="h-9 gap-1.5 font-semibold text-xs rounded-full px-3 select-none cursor-pointer"
      aria-label="Changer de langue"
    >
      <Languages className="size-4 text-muted-foreground" />
      <span>{lang === "fr" ? "EN" : "FR"}</span>
    </Button>
  );
}
