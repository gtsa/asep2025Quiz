"use client"

import { useState, useEffect } from "react"
import { Quiz } from "@/components/Quiz"
import { QuizStartMenu } from "@/components/QuizStartMenu"
import { CATEGORIES } from "@/lib/constants"

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false)
  const [questionCount, setQuestionCount] = useState<number | "max" | null>(null)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const [isShuffled, setIsShuffled] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isShuffled") === "true"
    }
    return false
  })

  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("selectedCategories")
      return stored ? JSON.parse(stored) : CATEGORIES
    }
    return CATEGORIES // fallback for SSR
  })


  useEffect(() => {
    if (selectedCategories) {
      localStorage.setItem("selectedCategories", JSON.stringify(selectedCategories))
    }
  }, [selectedCategories])

  // ✅ only *render* conditionally, not call hooks conditionally
  if (!hasMounted || selectedCategories === null) return null

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      {!isQuizCompleted && (
        <div className="bg-white shadow-sm border-b sticky top-0 z-30" style={{ boxShadow: '0 2px 12px rgba(1, 28, 75, 0.68)' }}>
          <div className="container mx-auto px-3 py-3">
            <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 text-center text-blue-900">
              Εξάσκηση ΑΣΕΠ 2025
            </h1>
          </div>
        </div>
      )}

      {/* Main */}
      <div className="container mx-auto min-h-[calc(100vh-6rem)] flex flex-col py-0 sm:py-8">
        {questionCount === null ? (
          <QuizStartMenu
            onStart={(count) => setQuestionCount(count)}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            isShuffled={isShuffled}
            setIsShuffled={setIsShuffled}
          />
        ) : (
          <Quiz
            questionCount={questionCount}
            isShuffled={isShuffled}
            setIsShuffled={setIsShuffled}
            selectedCategories={selectedCategories}
            setIsQuizCompleted={setIsQuizCompleted}
          />
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-50 border-t">
        <div className="container mx-auto px-3 py-1 text-center">
          <p className="text-xs text-gray-500">Σύρε ή πάτησε για πλοήγηση • 🄯 2025 geotsa</p>
        </div>
      </div>
    </div>
  )
}
