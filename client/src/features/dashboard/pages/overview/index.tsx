"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/providers/translation-provider";
import { 
  Users, Calendar, ClipboardCheck, Sparkles, 
  Smile, ShieldCheck, Award, MessageSquare, CheckSquare 
} from "lucide-react";
import { 
  LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart as RechartsBarChart, Bar
} from "recharts";

// Mock data for Patient Mood tracking
const moodData = [
  { name: "Lun", score: 3 },
  { name: "Mar", score: 4 },
  { name: "Mer", score: 3 },
  { name: "Jeu", score: 5 },
  { name: "Ven", score: 4 },
  { name: "Sam", score: 5 },
  { name: "Dim", score: 4 },
];

// Mock data for Coach's patient trouble distribution
const troubleDistribution = [
  { name: "Anxiété", count: 12 },
  { name: "Stress", count: 8 },
  { name: "Couple", count: 6 },
  { name: "Deuil", count: 4 },
  { name: "Alimentation", count: 3 },
];

export function OverviewPage() {
  const { t } = useTranslation();
  const [role, setRole] = useState<"patient" | "professional">("professional");

  useEffect(() => {
    const savedRole = localStorage.getItem("user-role");
    if (savedRole === "patient" || savedRole === "professional") {
      setRole(savedRole);
    }
  }, []);

  const [patientGoals, setPatientGoals] = useState([
    { id: 1, text: "Avoir une discussion calme sur le budget", completed: true },
    { id: 2, text: "Prendre 1 heure de détente pour soi par jour", completed: false },
    { id: 3, text: "Compléter le questionnaire de compatibilité", completed: false },
  ]);

  const toggleGoal = (id: number) => {
    setPatientGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const completedGoalsCount = patientGoals.filter((g) => g.completed).length;
  const goalsProgress = (completedGoalsCount / patientGoals.length) * 100;

  if (role === "patient") {
    // PATIENT DASHBOARD OVERVIEW
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("welcome")}, Ramy</h1>
          <p className="text-muted-foreground text-sm">{t("patientOverviewDesc")}</p>
        </div>

        {/* Patient Key Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{t("nextSession")}</CardTitle>
              <Calendar className="size-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">12 Juin à 14h00</div>
              <p className="text-xs text-muted-foreground mt-1">{t("nextSessionDesc")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{t("avgMood")}</CardTitle>
              <Smile className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold flex items-center gap-1.5">
                <span>4.1 / 5</span>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">{t("stableBadge")}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{t("moodDesc")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{t("completedGoals")}</CardTitle>
              <Award className="size-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{completedGoalsCount} sur {patientGoals.length}</div>
              <p className="text-xs text-muted-foreground mt-1">{Math.round(goalsProgress)}% {t("goalsProgressDesc")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{t("medicalDossier")}</CardTitle>
              <ShieldCheck className="size-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{t("encryptedHds")}</div>
              <p className="text-xs text-muted-foreground mt-1">{t("sharingActive")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts & Actions */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
          {/* Mood History Chart */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>{t("myMoodTracking")}</CardTitle>
              <CardDescription>{t("moodHistoryDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="h-[240px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis domain={[1, 5]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} ticks={[1, 2, 3, 4, 5]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="oklch(0.216 0.006 56.043)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Goals Checklist */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>{t("goalsTitle")}</CardTitle>
              <CardDescription>{t("goalsDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Progress value={goalsProgress} className="h-2" />
              <div className="flex flex-col gap-3 mt-2">
                {patientGoals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className="flex items-center gap-3 w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-all cursor-pointer"
                  >
                    <CheckSquare className={`size-5 shrink-0 ${goal.completed ? "text-emerald-500 fill-emerald-500/10" : "text-muted-foreground"}`} />
                    <span className={`text-sm ${goal.completed ? "line-through text-muted-foreground" : "text-foreground font-medium"}`}>
                      {goal.text}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // COACH / THÉRAPEUTE OVERVIEW
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("brand")} - {t("professionalSpace")}</h1>
        <p className="text-muted-foreground text-sm">{t("professionalOverviewDesc")}</p>
      </div>

      {/* Specialist Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{t("statsPatients")}</CardTitle>
            <Users className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground mt-1">{t("statsPatientsDesc")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{t("statsRdv")}</CardTitle>
            <Calendar className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-1">{t("statsRdvDesc")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{t("statsEval")}</CardTitle>
            <ClipboardCheck className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground mt-1">{t("statsEvalDesc")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{t("statsRevenus")}</CardTitle>
            <Sparkles className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 420 €</div>
            <p className="text-xs text-muted-foreground mt-1">{t("statsRevenusDesc")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        {/* Trouble Distribution Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>{t("troubleDistributionTitle")}</CardTitle>
            <CardDescription>{t("troubleDistributionDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="h-[240px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={troubleDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="oklch(0.216 0.006 56.043)" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Patient Actions */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>{t("recentActivityTitle")}</CardTitle>
            <CardDescription>{t("recentActivityDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <div className="bg-primary/10 rounded-full p-2 shrink-0">
                <ClipboardCheck className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Test d'évaluation soumis</p>
                <p className="text-xs text-muted-foreground">Marc Tournier a complété le test de compatibilité (Score: 58)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-3">
              <div className="bg-emerald-500/10 rounded-full p-2 shrink-0">
                <ShieldCheck className="size-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">Partage médecin activé</p>
                <p className="text-xs text-muted-foreground">Jennifer Anderson a autorisé le partage de son dossier codé</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-3">
              <div className="bg-amber-500/10 rounded-full p-2 shrink-0">
                <MessageSquare className="size-4 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">Message asynchrone reçu</p>
                <p className="text-xs text-muted-foreground">Sarah Williams vous a laissé une note vocale dans le chat</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Simple Helper Badge component
function Badge({ children, variant, className }: { children: React.ReactNode; variant?: string; className?: string }) {
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${className}`}>
      {children}
    </span>
  );
}
