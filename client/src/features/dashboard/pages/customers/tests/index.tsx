"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ClipboardList, HelpCircle } from "lucide-react";
import { useTranslation } from "@/providers/translation-provider";

interface Question {
  id: number;
  text: string;
  options: { label: string; value: number }[];
}

const TESTS = [
  {
    id: "stress",
    title: "Évaluation du Stress & Bien-être",
    description: "Évaluez votre niveau de stress quotidien, de charge mentale et d'équilibre général.",
    questions: [
      {
        id: 1,
        text: "À quelle fréquence vous sentez-vous dépassé par vos responsabilités ?",
        options: [
          { label: "Jamais", value: 0 },
          { label: "Parfois", value: 10 },
          { label: "Souvent", value: 20 },
          { label: "Toujours", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Avez-vous des difficultés à vous endormir ou à rester endormi ?",
        options: [
          { label: "Jamais", value: 0 },
          { label: "Parfois", value: 10 },
          { label: "Souvent", value: 20 },
          { label: "Toujours", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Prenez-vous du temps pour vous détendre chaque jour ?",
        options: [
          { label: "Toujours", value: 0 },
          { label: "Souvent", value: 5 },
          { label: "Parfois", value: 15 },
          { label: "Jamais", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Ressentez-vous des tensions physiques liées au stress (dos, épaules) ?",
        options: [
          { label: "Jamais", value: 0 },
          { label: "Parfois", value: 10 },
          { label: "Souvent", value: 20 },
          { label: "Toujours", value: 25 },
        ],
      },
    ],
  },
  {
    id: "couple",
    title: "Test de Compatibilité & Harmonie (Futurs Mariés)",
    description: "Analysez la communication et l'alignement de vos objectifs de vie en couple.",
    questions: [
      {
        id: 1,
        text: "Comment gérez-vous les désaccords sur les finances du couple ?",
        options: [
          { label: "Communication calme et ouverte", value: 0 },
          { label: "Compromis après discussion", value: 5 },
          { label: "Évitement du sujet", value: 15 },
          { label: "Arguments et tensions répétés", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Partagez-vous la même vision concernant la parentalité et l'éducation ?",
        options: [
          { label: "Parfaitement alignés", value: 0 },
          { label: "Quelques divergences mineures", value: 10 },
          { label: "Désaccords importants", value: 20 },
          { label: "Sujet jamais abordé en profondeur", value: 25 },
        ],
      },
      {
        id: 3,
        text: "À quel point vous sentez-vous écouté par votre partenaire ?",
        options: [
          { label: "Toujours", value: 0 },
          { label: "Souvent", value: 5 },
          { label: "Parfois", value: 15 },
          { label: "Jamais", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Planifiez-vous régulièrement des projets d'avenir communs à long terme ?",
        options: [
          { label: "Régulièrement", value: 0 },
          { label: "De temps en temps", value: 10 },
          { label: "Rarement", value: 20 },
          { label: "Jamais", value: 25 },
        ],
      },
    ],
  },
];

export function PsychometricTestsPage() {
  const { t } = useTranslation();
  const [selectedTest, setSelectedTest] = useState<typeof TESTS[0] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleSelectTest = (testId: string) => {
    const test = TESTS.find((t) => t.id === testId);
    if (test) {
      setSelectedTest(test);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setScore(null);
    }
  };

  const handleAnswerSelect = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (!selectedTest) return;
    if (currentQuestionIndex < selectedTest.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
      setScore(totalScore);
    }
  };

  const handleReset = () => {
    setSelectedTest(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScore(null);
  };

  const currentQuestion = selectedTest?.questions[currentQuestionIndex];
  const progressPercent = selectedTest
    ? ((currentQuestionIndex + 1) / selectedTest.questions.length) * 100
    : 0;

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto py-4">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight">{t("testTitlePage")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("testDescPage")}
        </p>
      </div>

      {!selectedTest ? (
        <div className="grid gap-4">
          {TESTS.map((test) => (
            <Card key={test.id} className="hover:border-primary transition-all cursor-pointer animate-in fade-in-50" onClick={() => handleSelectTest(test.id)}>
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <ClipboardList className="size-6" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{test.title}</CardTitle>
                  <CardDescription className="mt-1.5">{test.description}</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="justify-end border-t pt-3 pb-3">
                <Button variant="ghost" size="sm">{t("demarrerTest")} &rarr;</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : score !== null ? (
        <Card className="text-center p-6 border-emerald-200 dark:border-emerald-900/30">
          <CardHeader className="flex flex-col items-center">
            <CheckCircle2 className="size-16 text-emerald-500 mb-2 animate-bounce" />
            <CardTitle className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{t("testCompleted")}</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              {t("answersSaved")}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <div className="inline-flex flex-col items-center justify-center p-6 bg-muted rounded-full size-32 border-4 border-emerald-500/30">
              <span className="text-3xl font-extrabold text-foreground">{score}</span>
              <span className="text-xs text-muted-foreground">{t("outOf100")}</span>
            </div>
            <p className="mt-6 text-sm text-foreground max-w-sm mx-auto">
              {score >= 60 
                ? t("highScoreDesc")
                : t("lowScoreDesc")
              }
            </p>
          </CardContent>
          <CardFooter className="justify-center gap-4 border-t pt-4">
            <Button variant="outline" onClick={handleReset}>{t("backToTests")}</Button>
            <Button onClick={() => window.location.href = "/dashboard/customers"}>{t("viewMyDossier")}</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="p-2">
          <CardHeader>
            <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
              <span>{t("questionOf").replace("{current}", String(currentQuestionIndex + 1)).replace("{total}", String(selectedTest.questions.length))}</span>
              <span>{t("percentCompleted").replace("{percent}", String(Math.round(progressPercent)))}</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <CardTitle className="text-xl mt-4 flex gap-2 items-start font-semibold">
              <HelpCircle className="size-5 text-primary shrink-0 mt-0.5" />
              <span>{currentQuestion?.text}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2.5 pt-2">
            {currentQuestion?.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(currentQuestion.id, option.value)}
                className={`w-full text-left p-3.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                  answers[currentQuestion.id] === option.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                {option.label}
              </button>
            ))}
          </CardContent>
          <CardFooter className="justify-between border-t mt-4 pt-4">
            <Button variant="ghost" onClick={handleReset}>{t("annuler")}</Button>
            <Button 
              disabled={answers[currentQuestion?.id ?? 0] === undefined} 
              onClick={handleNext}
            >
              {currentQuestionIndex === selectedTest.questions.length - 1 ? t("terminer") : t("suivant")}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
