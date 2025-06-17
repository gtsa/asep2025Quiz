"use client"

import { useState, useEffect } from "react"
import { Quiz } from "@/components/Quiz"
import { QuizStartMenu } from "@/components/QuizStartMenu"
import { CATEGORIES } from "@/lib/constants"
import { Moon, Sun } from "lucide-react"

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false)
  const [questionCount, setQuestionCount] = useState<number | "max" | null>(null)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const [isShuffled, setIsShuffled] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("isShuffled")
    if (stored !== null) {
      setIsShuffled(stored === "true")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("isShuffled", isShuffled.toString())
  }, [isShuffled])

   const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const shouldUseDark = storedTheme === "dark" || (!storedTheme && prefersDark)

    setIsDarkMode(shouldUseDark)

    if (shouldUseDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

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
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      {/* Header */}
      {!isQuizCompleted && (
        <div className="bg-white shadow-sm border-b sticky top-0 z-30 dark:bg-gray-800 dark:border-gray-700" style={{ boxShadow: '0 2px 12px rgba(1, 28, 75, 0.68)' }}>
          <div className="container mx-auto px-3 py-3">
            <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 text-center text-blue-900 dark:text-white">
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
      <div className="container mx-auto px-3 py-1 text-center">
        <div className="text-xs text-gray-500 dark:text-gray-300 flex items-center justify-center gap-x-2">
          <span>BUTTON 1</span>
          <button onClick={toggleDarkMode} title="Theme toggle" className="p-1 hover:opacity-80 transition">
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <span> •  Σύρε ή πάτησε για πλοήγηση  •  🄯 2025 geotsa</span>
        </div>
      </div>






    </div>
  )
}
