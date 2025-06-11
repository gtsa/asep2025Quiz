"use client"

import { useState, useEffect } from "react"
import { Quiz } from "@/components/quiz"
import { QuizStartMenu } from "@/components/quizStartMenu"
import { CATEGORIES } from "@/lib/constants"

export default function Home() {
  const [questionCount, setQuestionCount] = useState<number | "max" | null>(null)
  const [isShuffled, setIsShuffled] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("isShuffled")
      return stored === "true"
    }
    return false
  })
  useEffect(() => {
    localStorage.setItem("isShuffled", String(isShuffled))
  }, [isShuffled])
  
  const [selectedCategories, setSelectedCategories] = useState<string[] | null>(null)

  // Load from localStorage (only on client)
  useEffect(() => {
    const stored = localStorage.getItem("selectedCategories")
    setSelectedCategories(stored ? JSON.parse(stored) : CATEGORIES)
  }, [])

  // Sync to localStorage on change
  useEffect(() => {
    if (selectedCategories) {
      localStorage.setItem("selectedCategories", JSON.stringify(selectedCategories))
    }
  }, [selectedCategories])

  if (selectedCategories === null) return null

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header (only show if quiz not started) */}
      {questionCount === null && (
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                Εξάσκηση ΑΣΕΠ 2025
              </h1>
            </div>
          </div>
        </div>
      )}


      {/* Main Content */}
      <div className="container mx-auto py-0 sm:py-8">
        {questionCount === null && selectedCategories !== null ? (
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
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t mt-12">
        <div className="container mx-auto px-4 py-0 text-center">
          <p className="text-xs text-gray-500">Σύρε ή πάτησε για πλοήγηση • 🄯 2025 geotsa</p>
        </div>
      </div>
    </div>
  )
}
