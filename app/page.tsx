"use client"

import { useState } from "react"
import { Quiz } from "@/components/quiz"
import { QuizStartMenu } from "@/components/quizStartMenu"

export default function Home() {
  const [questionCount, setQuestionCount] = useState<number | "max" | null>(null)
  const [isShuffled, setIsShuffled] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header (only show if quiz not started) */}
      {questionCount === null && (
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                ΑΣΕΠ 2025 Practice Quiz
              </h1>
            </div>
          </div>
        </div>
      )}


      {/* Main Content */}
      <div className="container mx-auto py-0 sm:py-8">
        {questionCount === null ? (
          <QuizStartMenu
            onStart={(count, categories) => {
              console.log("📦 Received categories in page.tsx:", categories)
              setQuestionCount(count)
              setSelectedCategories(categories)
            }}
            isShuffled={isShuffled}
            setIsShuffled={setIsShuffled}
          />
        ) : (
          <Quiz
            questionCount={questionCount}
            isShuffled={isShuffled}
            setIsShuffled={setIsShuffled}
            selectedCategories={selectedCategories}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t mt-12">
        <div className="container mx-auto px-4 py-0 text-center">
          <p className="text-xs text-gray-500">Swipe or tap to navigate • Optimized for mobile devices</p>
        </div>
      </div>
    </div>
  )
}
