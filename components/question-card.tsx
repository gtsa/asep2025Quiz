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
            <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full w-fit">{question.category}</span>
          )}
        </div>
        <CardTitle className="text-lg sm:text-xl leading-relaxed text-gray-900">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === option ? "default" : "outline"}
              className={`w-full text-left justify-start min-h-[60px] p-4 whitespace-normal text-wrap transition-all duration-200 ${
                selectedAnswer === option
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  : "hover:bg-gray-50 hover:border-gray-300"
              }`}
              onClick={() => onSelectAnswer(option)}
            >
              <span className="font-bold mr-3 text-base flex-shrink-0">{String.fromCharCode(65 + index)}.</span>
              <span className="text-sm sm:text-base leading-relaxed">{option}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
