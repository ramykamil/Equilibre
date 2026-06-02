"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "@/providers/translation-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: "login" | "signup";
}

export function AuthModal({ isOpen, onOpenChange, defaultMode = "login" }: AuthModalProps) {
  const { t } = useTranslation();
  const router = useRouter();
  
  const [mode, setMode] = useState<"login" | "signup">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"patient" | "professional">("patient");
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Fetch user profile role to redirect correctly
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profileError || !profile) {
          // Fallback if profile creation was delayed
          localStorage.setItem("user-role", role);
          router.push("/dashboard/overview");
        } else {
          localStorage.setItem("user-role", profile.role);
          router.push("/dashboard/overview");
        }
        
        onOpenChange(false);
        // Force refresh to reload layouts
        window.location.reload();
      } else {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              full_name: fullName,
              role: role,
            },
          },
        });

        if (error) throw error;

        setSuccessMessage(t("signUpSuccess"));
        setMode("login");
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setErrorMessage(err.message || t("invalidCredentials"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="glass-panel border-border/40 max-w-md bg-background/90 backdrop-blur-xl shadow-2xl transition-all duration-300">
        <DialogHeader className="space-y-1.5 text-center">
          <DialogTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {t("authModalTitle")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {t("authModalSubtitle")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAuth} className="space-y-4 pt-2">
          {errorMessage && (
            <div className="bg-destructive/10 text-destructive rounded-lg border border-destructive/20 p-3 text-center text-sm font-medium">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-500/10 text-green-500 rounded-lg border border-green-500/20 p-3 text-center text-sm font-medium">
              {successMessage}
            </div>
          )}

          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Nom complet / Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="e.g. Ramy Kamil"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-background/50 border-border/50 focus:border-primary/50"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background/50 border-border/50 focus:border-primary/50"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background/50 border-border/50 focus:border-primary/50"
            />
          </div>

          {mode === "signup" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("roleLabel")}</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("patient")}
                  className={`flex items-center justify-center rounded-lg border p-3 text-sm font-semibold transition-all ${
                    role === "patient"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/50 hover:bg-muted/50"
                  }`}
                >
                  {t("rolePatient")}
                </button>
                <button
                  type="button"
                  onClick={() => setRole("professional")}
                  className={`flex items-center justify-center rounded-lg border p-3 text-sm font-semibold transition-all ${
                    role === "professional"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/50 hover:bg-muted/50"
                  }`}
                >
                  {t("roleCoach")}
                </button>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : mode === "login" ? (
              t("loginBtn")
            ) : (
              t("signupBtn")
            )}
          </Button>

          <div className="pt-2 text-center text-sm">
            {mode === "login" ? (
              <p className="text-muted-foreground">
                {t("noAccountText")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMessage("");
                  }}
                  className="text-primary hover:underline font-semibold"
                >
                  {t("signupBtn")}
                </button>
              </p>
            ) : (
              <p className="text-muted-foreground">
                {t("haveAccountText")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMessage("");
                  }}
                  className="text-primary hover:underline font-semibold"
                >
                  {t("loginBtn")}
                </button>
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
