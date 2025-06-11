"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Question } from "@/lib/types"

interface QuestionCardProps {
  question: Question
  selectedAnswer?: string
  onSelectAnswer: (answer: string) => void
  questionNumber: number
  totalQuestions: number
}

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <Card className="w-full mx-auto shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          {question.category && (
            <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full w-fit">
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
          {Object.entries(question.options).map(([key, option]) => {
            const isSelected = selectedAnswer === key
            const isCorrect = question.correctAnswer === key
            const showAsCorrect = selectedAnswer && isCorrect
            const showAsWrong = selectedAnswer === key && !isCorrect

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
                <span className="font-bold mr-2 uppercase">{key}.</span>
                {option}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
