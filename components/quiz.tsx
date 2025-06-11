"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuestionCard } from "./question-card"
import { ProgressBar } from "./progress-bar"
import { useQuiz } from "@/hooks/use-quiz"
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion';

export function Quiz({
  questionCount,
  isShuffled,
  setIsShuffled
}: {
  questionCount: number | "max"
  isShuffled: boolean
  setIsShuffled: (value: boolean) => void
}){

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

  useEffect(() => {
    if (questionCount !== undefined && questionCount !== null) {
      fetchQuestions(questionCount)
    }
  }, [questionCount])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Loading questions...</p>
          <p className="text-sm text-muted-foreground mt-2">Please wait while we prepare your quiz</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4">
        <Card className="w-full mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold mb-2">Oops! Something went wrong</h3>
            <p className="text-red-600 mb-6 text-sm">{error}</p>
            <Button onClick={() => window.location.reload()} className="w-full sm:w-auto" size="lg">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="px-4">
        <Card className="w-full mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <p className="text-muted-foreground text-lg">No questions available.</p>
            <p className="text-sm text-muted-foreground mt-2">Please check back later.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (quizState.isCompleted) {
  const answeredQuestions = Object.keys(quizState.answers).length
  const percentage = Math.round((quizState.score / questions.length) * 100)
  const color = percentage >= 75 ? "green" : percentage >= 50 ? "yellow" : "red"

  const colorMap = {
    green: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-600",
      softBg: "bg-green-50",
      softText: "text-green-800",
      softTextAlt: "text-green-600"
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-600",
      softBg: "bg-yellow-50",
      softText: "text-yellow-800",
      softTextAlt: "text-yellow-600"
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-600",
      softBg: "bg-red-50",
      softText: "text-red-800",
      softTextAlt: "text-red-600"
    }
  }

  const styles = colorMap[color]

    return (
      <div className="px-4">
        <Card className="w-full mx-auto">
          <CardHeader className="text-center pb-4">
                  <div className={`w-24 h-24 rounded-full mx-auto mb-2 flex items-center justify-center text-4xl font-extrabold border-4 ${styles.bg} ${styles.text} ${styles.border}`}>
                    {percentage}%
                  </div>
                  <CardTitle className={`text-lg sm:text-xl font-semibold ${styles.text}`}>
                    Quiz Completed{percentage === 100 ? " 🎉" : ""}
                  </CardTitle>
                  {percentage < 50 && (
                    <p className="text-sm font-medium text-red-600 mt-2">Try harder. You can do it!</p>
                  )}
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className={`rounded-lg p-4 ${styles.softBg}`}>
              <p className={`text-lg font-semibold ${styles.softText}`}>
                You answered correctly {quizState.score} out of {questions.length} questions
              </p>
              <p className={`text-sm mt-1 ${styles.softTextAlt}`}>
                {percentage === 100
                  ? "Perfect score! 🎯"
                  : percentage >= 75
                  ? "Great job completing the practice quiz!"
                  : percentage >= 50
                  ? "Keep it up, you're getting there!"
                  : "Review the material and try again!"}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Your Answers Summary:</h3>
              <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
                <div className="space-y-3 text-left">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                      <p className="font-medium text-sm mb-1">
                        Q{index + 1}: {question.question}
                      </p>
                      <p className={`text-xs px-2 py-1 rounded ${quizState.answers[question.id] === question.correctAnswer ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        <span className="font-medium">Your Answer:</span> {quizState.answers[question.id] || "Not answered"}
                      </p>
                        {question.correctAnswer && quizState.answers[question.id] !== question.correctAnswer && (
                          <p className={`text-xs px-2 py-1 rounded ${quizState.answers[question.id] === question.correctAnswer ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            <><span className="font-medium">Correct:</span> {question.correctAnswer}</>
                          </p>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button onClick={resetQuiz} className="w-full sm:w-auto" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Start New Practice
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="px-4">
        <Card className="w-full mx-auto">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Question not found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 px-4">
      {/* Progress Section */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isShuffled}
              onChange={(e) => setIsShuffled(e.target.checked)}
            />
            <span className="text-sm text-gray-600">Shuffle</span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {Object.keys(quizState.answers).length} of {questions.length} answered
          </span>
          <span className="text-sm font-medium text-blue-600">Question {quizState.currentQuestionIndex + 1}</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Question Card */}
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
              correctAnswer={currentQuestion.correctAnswer}
              questionNumber={quizState.currentQuestionIndex + 1}
              totalQuestions={questions.length}
              isShuffled={isShuffled}
            />
        </motion.div>
      </AnimatePresence>
      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center pt-4">
        <Button
          variant="outline"
          onClick={previousQuestion}
          disabled={quizState.currentQuestionIndex === 0}
          className="w-full sm:w-auto order-2 sm:order-1"
          size="lg"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={nextQuestion}
          disabled={!currentAnswer}
          className={`w-full sm:w-auto order-1 sm:order-2 ${
            quizState.currentQuestionIndex === questions.length - 1
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          size="lg"
        >
          {quizState.currentQuestionIndex === questions.length - 1 ? "Complete Quiz" : "Next Question"}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Helper Text */}
      {!currentAnswer && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            👆 Please select an answer to continue
          </p>
        </div>
      )}
    </div>
  )
}
