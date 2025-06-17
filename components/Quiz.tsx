"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { QuestionCard } from "./QuestionCard"
import { ProgressBar } from "./ProgressBar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover"
import { useQuiz } from "@/hooks/use-quiz"
import { ChevronLeft, ChevronRight, RotateCcw, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { categoryColorMap, defaultCategoryColor } from "@/lib/categoryColors"
import { useTranslation } from "react-i18next"

export function Quiz({
  questionCount,
  isShuffled,
  setIsShuffled,
  selectedCategories,
  setIsQuizCompleted
}: {
  questionCount: number | "max"
  isShuffled: boolean
  setIsShuffled: (value: boolean) => void
  selectedCategories: string[]
  setIsQuizCompleted: (val: boolean) => void
}) {
  const [activeTab, setActiveTab] = useState<"all" | "wrong">("all")
  const {
    questions,
    fetchQuestions,
    quizState,
    currentQuestion,
    currentAnswer,
    progress,
    loading,
    error,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    resetQuiz,
  } = useQuiz()

  const { t, i18n } = useTranslation()
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "el" ? "en" : "el")
  }

  useEffect(() => {
    const count = questionCount === "max" ? undefined : questionCount
    fetchQuestions(count, selectedCategories)
  }, [questionCount, selectedCategories])

  useEffect(() => {
    setIsQuizCompleted(quizState.isCompleted)
  }, [quizState.isCompleted, setIsQuizCompleted])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-3">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
          <p className="text-muted-foreground text-xs">{t("loading")}</p>
          <p className="text-sm text-muted-foreground mt-2">{t("pleaseWait")}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-3">
        <Card className="w-full mx-auto">
          <CardContent className="pt-3 text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xs font-semibold mb-2">{t("errorTitle")}</h3>
            <p className="text-red-600 mb-6 text-sm">{error}</p>
            <Button onClick={() => window.location.reload()} className="w-full sm:w-auto" size="sm">
              {t("tryAgain")}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="px-3">
        <Card className="w-full mx-auto">
          <CardContent className="pt-3 text-center">
            <div className="text-gray-400 text-4xl mb-4">📝</div>
            <p className="text-muted-foreground text-xs">{t("noQuestions")}</p>
            <p className="text-sm text-muted-foreground mt-2">{t("checkLater")}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (quizState.isCompleted) {
    const percentage = Math.round((quizState.score / questions.length) * 100)
    const color = percentage >= 75 ? "green" : percentage >= 50 ? "yellow" : "red"

    const colorMap = {
      green: {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-600",
        softBg: "bg-green-50",
        softText: "text-green-800",
        softTextAlt: "text-green-600",
      },
      yellow: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        border: "border-yellow-600",
        softBg: "bg-yellow-50",
        softText: "text-yellow-800",
        softTextAlt: "text-yellow-600",
      },
      red: {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-600",
        softBg: "bg-red-50",
        softText: "text-red-800",
        softTextAlt: "text-red-600",
      },
    }

    const styles = colorMap[color]

    return (
      <div className="px-0.5 py-0.5">
        <Card className="w-full mx-auto flex flex-col flex-1">
          <CardHeader className="text-center pb-3">
            <div
              className={`w-20 h-20 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-extrabold border-4 ${styles.bg} ${styles.text} ${styles.border} dark:bg-opacity-5`}
            >
              {percentage}%
            </div>
            <CardTitle className={`text-base sm:text-sm font-semibold ${styles.text} dark:bg-opacity-5`}>
              {t("success")}{percentage === 100 ? " 🎉" : ""}
            </CardTitle>
            {percentage < 50 && (
              <p className="text-sm font-medium text-red-600 mt-2">{t("encouragement")}</p>
            )}
          </CardHeader>
          {/* <CardContent className="text-center space-y-4  px-2"> */}
          <CardContent className="flex flex-col flex-1 overflow-y-auto">
            <div className={`rounded-lg p-2 text-center ${styles.softBg} dark:bg-opacity-5`}>
              {/* leading-relaxed prose-sm max-w-none */}
              <span className={`prose-base max-w-none ${styles.softText}`}>
                {t("correct")} {quizState.score} {t("on")} {questions.length} {t("questions")}
              </span>
              <p className={`text-sm mt-1 ${styles.softTextAlt}`}>
                {percentage === 100
                  ? t("finalMessage100")
                  : percentage >= 75
                  ? t("finalMessage75")
                  : percentage >= 50
                  ? t("finalMessage50")
                  : t("finalMessageElse")
                }
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-base text-center pt-2">{t("yourAnswers")}</h3>
              <div className="flex gap-1 justify-center">
                <Button
                  variant={activeTab === "all" ? "default" : "outline"}
                  onClick={() => setActiveTab("all")}
                  className="w-full px-2 py-1  h-auto"
                >
                  {t("all")}
                </Button>
                <Button
                  variant={activeTab === "wrong" ? "default" : "outline"}
                  onClick={() => setActiveTab("wrong")}
                  className="w-full px-2 py-1 h-auto"
                >
                  {t("wrongAnswers")}
                </Button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-1 h-full max-h-[calc(100vh-4rem)] overflow-y-auto">
                {questions.every(q => activeTab === "wrong" ? quizState.answers[q.id] === q.correctAnswer : false) ? (
                  <p className="text-sm text-muted-foreground text-center">{t("noWrong")}</p>
                ) : (
                  <div className="space-y-3 text-left">
                    {questions.map((question, index) => {
                      const isWrong = quizState.answers[question.id] !== question.correctAnswer
                      const show = activeTab === "all" || (activeTab === "wrong" && isWrong)
                      const categoryStyle = categoryColorMap[question.category ?? ""] ?? defaultCategoryColor
                      if (!show) return null
                      return (
                        <div key={question.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                            {question.category && (
                              <span
                                className={`w-fit order-1 sm:order-2 text-[8px] px-2 py-0.5 rounded-full whitespace-nowrap ml-0 sm:ml-4 shrink-0 ${categoryStyle.bg} ${categoryStyle.text}`}
                              >
                                {question.category} ({question.indexInCategory})
                              </span>
                            )}

                            <p className="order-2 sm:order-1 font-medium text-xs">
                              Q{index + 1}:{' '}
                              <span
                                className="prose max-w-none inline text-xs sm:text-xs dark:text-gray-200"
                                dangerouslySetInnerHTML={{ __html: question.question ?? "" }}
                              />
                            </p>
                          </div>


                          <p className={`text-xs px-2 py-1 rounded ${quizState.answers[question.id] === question.correctAnswer ? "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-100" : "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-100"}`}>
                            <span className="font-medium">{t("yourAnswer")}</span> {quizState.answers[question.id] || "Not answered"}
                          </p>
                          {isWrong && (
                            <p className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-100">
                              <span className="font-medium">{t("correctAnswer")}</span> {question.correctAnswer}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto pt-4 flex justify-center">
              <Button onClick={resetQuiz} className="w-full sm:w-auto" size="sm">
                <RotateCcw className="w-3 h-3 mr-2" />
                {t("tryAgain")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="px-3">
        <Card className="w-full mx-auto">
          <CardContent className="pt-3 text-center">
            <p className="text-muted-foreground">{t("noAnswer")}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4 px-3 ">
      <div className="w-full">
        <div className="mt-2">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="flex items-center gap-2 px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
              >
                {t("selectedCategories")}
                <div className="flex gap-1">
                  {selectedCategories.map((cat) => {
                    const categoryStyle = categoryColorMap[cat] ?? defaultCategoryColor
                    return (
                      <span
                        key={cat}
                        className={`w-3 h-3 rounded-full border ${categoryStyle.bg} border-current`}
                        title={cat}
                      />
                    )
                  })}
                </div>
                <span className="ml-1 text-gray-500">▼</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="text-xs max-w-xs">
              <div className="flex flex-wrap gap-1">
              {selectedCategories.map((cat) => {
                const categoryStyle = categoryColorMap[cat] ?? defaultCategoryColor
                return (
                  <span
                    key={cat}
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${categoryStyle.bg} ${categoryStyle.text}`}
                  >
                    {cat}
                  </span>
                )
              })}
            </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex justify-between items-center mb-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isShuffled}
              onChange={(e) => setIsShuffled(e.target.checked)}
            />
            <span className="text-sm text-gray-600">{t("shuffled")}</span>
          </div>
          <span className="text-sm font-medium text-blue-600">
            {Object.keys(quizState.answers).length} {t("of")} {questions.length} {t("answered")}
          </span>
        </div>
        <ProgressBar progress={progress} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={quizState.currentQuestionIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
        >
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={currentAnswer}
            onSelectAnswer={selectAnswer}
            questionNumber={quizState.currentQuestionIndex + 1}
            isShuffled={isShuffled}
          />
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          onClick={previousQuestion}
          disabled={quizState.currentQuestionIndex === 0}
          className="flex-1"
          size="sm"
        >
          <ChevronLeft className="w-3 h-3 mr-1" />
          {t("previous")}
        </Button>
        <Button
          onClick={nextQuestion}
          disabled={!currentAnswer}
          className={`flex-1 ${
            quizState.currentQuestionIndex === questions.length - 1
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          size="sm"
        >
          {quizState.currentQuestionIndex === questions.length - 1 ? t("finish") : t("next")}
          <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  )
}
