"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { categoryColorMap, defaultCategoryColor } from "@/lib/categoryColors"
import type { Question } from "@/lib/types"

interface QuestionCardProps {
  question: Question
  selectedAnswer?: string
  onSelectAnswer: (answer: string) => void
  questionNumber: number
  totalQuestions: number
  isShuffled: boolean
}

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
  isShuffled
}: QuestionCardProps) {
  const [shuffledOptions, setShuffledOptions] = useState<[string, string][]>([])

  const categoryStyle = categoryColorMap[question.category ?? ""] ?? defaultCategoryColor

  useEffect(() => {
    const entries = Object.entries(question.options)
    const shuffled = isShuffled
      ? [...entries].sort(() => Math.random() - 0.5)
      : entries
    setShuffledOptions(shuffled)
  }, [question, isShuffled])

  return (
    <Card className="w-full mx-auto shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          {question.category && (
            <span   className={`text-xs px-3 py-1 rounded-full w-fit ${categoryStyle.bg} ${categoryStyle.text}`}>
              {question.category} ({question.indexInCategory})
            </span>
          )}
        </div>
        <CardTitle className="text-lg sm:text-xl leading-relaxed text-gray-900">
          {question.question}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
         


          {shuffledOptions.map(([key, option], index) => {
            const isSelected = selectedAnswer === option
            const isCorrect = question.correctAnswer === option
            const showAsCorrect = selectedAnswer && isCorrect
            const showAsWrong = isSelected && !isCorrect

            return (
              <Button
                key={key}
                variant="outline"
                onClick={() => onSelectAnswer(key)}
                disabled={!!selectedAnswer}
                className={`
                  w-full justify-start
                  ${showAsCorrect ? "border-green-600 text-green-700 bg-green-50" : ""}
                  ${showAsWrong ? "border-red-600 text-red-700 bg-red-50" : ""}
                  ${isSelected && !showAsCorrect && !showAsWrong ? "border-blue-600" : ""}
                `}
              >
                <span className="font-bold mr-2 lowercase">
                  {["α", "β", "γ", "δ"][index]}.
                </span>
                {option}
              </Button>
            )
          })}

        </div>
      </CardContent>
    </Card>
  )
}
