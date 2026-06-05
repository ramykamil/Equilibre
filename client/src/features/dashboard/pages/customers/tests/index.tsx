"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  HelpCircle,
  Brain,
  HeartPulse,
  HeartHandshake,
  Activity,
  Search,
  Clock,
  FileQuestion,
  ArrowLeft,
  ChevronRight,
  Info,
  X,
} from "lucide-react";
import { useTranslation } from "@/providers/translation-provider";
import { ALL_TESTS, TEST_CATEGORIES, type TestCategory, type PsychometricTest } from "./tests-data";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  brain: <Brain className="size-4" />,
  "heart-pulse": <HeartPulse className="size-4" />,
  "heart-handshake": <HeartHandshake className="size-4" />,
  activity: <Activity className="size-4" />,
};

const CATEGORY_COLORS: Record<TestCategory, string> = {
  general: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  elderly: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  couple: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  stress: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

const CATEGORY_CARD_ACCENTS: Record<TestCategory, string> = {
  general: "hover:border-violet-400/50 dark:hover:border-violet-500/40",
  elderly: "hover:border-rose-400/50 dark:hover:border-rose-500/40",
  couple: "hover:border-pink-400/50 dark:hover:border-pink-500/40",
  stress: "hover:border-amber-400/50 dark:hover:border-amber-500/40",
};

const CATEGORY_ICON_BG: Record<TestCategory, string> = {
  general: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  elderly: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  couple: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  stress: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export function PsychometricTestsPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<TestCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTest, setSelectedTest] = useState<PsychometricTest | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);

  const filteredTests = useMemo(() => {
    return ALL_TESTS.filter((test) => {
      const matchCategory = selectedCategory === "all" || test.category === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (test.acronym && test.acronym.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSelectTest = (testId: string) => {
    const test = ALL_TESTS.find((t) => t.id === testId);
    if (test) {
      setSelectedTest(test);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setScore(null);
      setShowDetails(null);
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

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ALL_TESTS.length };
    TEST_CATEGORIES.forEach((cat) => {
      counts[cat.id] = ALL_TESTS.filter((t) => t.category === cat.id).length;
    });
    return counts;
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto py-4">
      {/* Page Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight">{t("testTitlePage")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("testDescPage")}
        </p>
      </div>

      {!selectedTest ? (
        <>
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder={t("searchTests")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
              }`}
            >
              {t("allCategories")}
              <span className="opacity-70">({categoryCounts.all})</span>
            </button>
            {TEST_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
                }`}
              >
                {CATEGORY_ICONS[cat.icon]}
                {t(cat.labelKey)}
                <span className="opacity-70">({categoryCounts[cat.id]})</span>
              </button>
            ))}
          </div>

          {/* Test Grid */}
          {filteredTests.length > 0 ? (
            <div className="grid gap-3">
              {filteredTests.map((test, index) => (
                <Card
                  key={test.id}
                  className={`transition-all border animate-in fade-in-50 ${CATEGORY_CARD_ACCENTS[test.category]}`}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <CardHeader className="flex flex-row items-start gap-3 pb-2">
                    <div className={`p-2 rounded-lg shrink-0 ${CATEGORY_ICON_BG[test.category]}`}>
                      {test.category === "general" && <Brain className="size-5" />}
                      {test.category === "elderly" && <HeartPulse className="size-5" />}
                      {test.category === "couple" && <HeartHandshake className="size-5" />}
                      {test.category === "stress" && <Activity className="size-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-[15px] leading-snug">{test.title}</CardTitle>
                      </div>
                      <CardDescription className="mt-1 text-xs leading-relaxed">
                        {test.description}
                      </CardDescription>

                      {/* Expanded details */}
                      {showDetails === test.id && (
                        <div className="mt-3 p-3 bg-muted/40 rounded-lg text-xs text-muted-foreground leading-relaxed animate-in fade-in-0 slide-in-from-top-2">
                          {test.longDescription}
                        </div>
                      )}

                      {/* Metadata badges */}
                      <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${CATEGORY_COLORS[test.category]}`}>
                          {t(TEST_CATEGORIES.find((c) => c.id === test.category)?.labelKey || "")}
                        </Badge>
                        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                          <FileQuestion className="size-3" />
                          {t("testsCount").replace("{count}", String(test.questions.length))}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="size-3" />
                          {t("testDuration").replace("{min}", String(test.durationMinutes))}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="justify-between border-t pt-2.5 pb-2.5 gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDetails(showDetails === test.id ? null : test.id);
                      }}
                    >
                      <Info className="size-3 mr-1" />
                      {t("testDetails")}
                    </Button>
                    <Button
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => handleSelectTest(test.id)}
                    >
                      {t("demarrerTest")}
                      <ChevronRight className="size-3 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <Search className="size-10 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">{t("noTestsFound")}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  {t("resetSearch")}
                </Button>
              </div>
            </Card>
          )}
        </>
      ) : score !== null ? (
        /* ──── Results Screen ──── */
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
        /* ──── Quiz Screen ──── */
        <div className="flex flex-col gap-3">
          {/* Back button with test name */}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>{t("backToTests")}</span>
          </button>

          {/* Test info header */}
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${CATEGORY_COLORS[selectedTest.category]}`}>
              {t(TEST_CATEGORIES.find((c) => c.id === selectedTest.category)?.labelKey || "")}
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">{selectedTest.acronym || selectedTest.title}</span>
          </div>

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
        </div>
      )}
    </div>
  );
}
