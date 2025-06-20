"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader} from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { categoryColorMap, defaultCategoryColor } from "@/lib/categoryColors"
import type { Question } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

interface QuestionCardProps {
  question: Question
  selectedAnswer?: string
  onSelectAnswer: (answer: string) => void
  questionNumber: number
  isShuffled: boolean
}

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  questionNumber,
  isShuffled
}: QuestionCardProps) {
  const [shuffledOptions, setShuffledOptions] = useState<[string, string][]>([])

  const { t, i18n } = useTranslation()
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "el" ? "en" : "el")
  }

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
      <CardHeader className="pb-3">
        <div className="flex flex-row justify-between items-center gap-2 mb-3">
          <span className="text-xs font-medium text-muted-foreground">
            {t("question")} {questionNumber}
          </span>
          {question.category && (
            <span className={`text-[8px] px-2 py-1 rounded-full w-fit ${categoryStyle.bg} ${categoryStyle.text}`}>
              {question.category} ({question.indexInCategory})
            </span>
          )}
        </div>

        <div className="text-sm leading-relaxed prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: question.question ?? "" }} />

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
                className={cn(
                  "w-full justify-start text-left h-auto py-2 px-3 min-h-[40px]",
                  showAsCorrect && "border-green-600 text-green-700 bg-green-50 !opacity-100",
                  showAsWrong && "border-red-600 text-red-700 bg-red-50 !opacity-100",
                  isSelected && !showAsCorrect && !showAsWrong && "border-blue-600 !opacity-100",
                  selectedAnswer && !showAsCorrect && !showAsWrong && "opacity-50"
                )}
              >
                <div className="flex items-start gap-2 w-full">
                  <span className="font-bold text-xs flex-shrink-0 mt-0.5">
                    {(t("optionLabels", { returnObjects: true }) as string[])[index]}.
                  </span>
                  <span className="text-xs leading-relaxed break-words flex-1 whitespace-normal">{option}</span>
                </div>
              </Button>
            )
          })}

        </div>
      </CardContent>
    </Card>
  )
}
