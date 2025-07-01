"use client"

import { useState, useEffect } from "react"
import { Quiz } from "@/components/Quiz"
import { QuizStartMenu } from "@/components/QuizStartMenu"
import { CATEGORIES } from "@/lib/constants"
import { Moon, Sun } from "lucide-react"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"
import PWAInstallPrompt from "../components/PWAInstallPrompt";

type PhaseValue = "phase_1" | "phase_2" | "phase_3"

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [questionCount, setQuestionCount] = useState<number | "max" | null>(null)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)

  const { t, i18n } = useTranslation()
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "el" ? "en" : "el")
  }

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

  const [phase, setPhase] = useState<PhaseValue | null>(null)

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
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      {!isQuizCompleted && (
        <div className="bg-white shadow-sm border-b sticky top-0 z-30 dark:bg-gray-800 dark:border-gray-700" style={{ boxShadow: '0 2px 12px rgba(1, 28, 75, 0.68)' }}>
          <div className="container mx-auto px-3 py-3">
            <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 text-center text-blue-900 dark:text-white">
              {t("title")}
            </h1>
          </div>
        </div>
      )}

      {/* Main Content with Bottom Padding */}
      <div className="container mx-auto flex flex-col py-0 sm:py-8 pb-28">
        {questionCount === null || !showQuiz ? (
          <QuizStartMenu
            onStart={(count, categories, selectedPhase) => {
              setQuestionCount(count)
              setSelectedCategories(categories)
              setPhase(selectedPhase) // ⬅️ add this
              setShowQuiz(true)
            }}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            isShuffled={isShuffled}
            setIsShuffled={setIsShuffled}
            lastUsedQuestionCount={questionCount}
          />
        ) : (
          <Quiz
            questionCount={questionCount}
            isShuffled={isShuffled}
            setIsShuffled={setIsShuffled}
            selectedCategories={selectedCategories}
            phase={phase}
            setIsQuizCompleted={setIsQuizCompleted}
            setShowQuiz={setShowQuiz}
          />
        )}
      </div>

      {/* Fixed Footer that overlays the bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border-t dark:border-gray-700 z-50">
        <div className="container mx-auto px-3 py-2 text-center">
          <div className="text-xs text-gray-500 dark:text-gray-300 flex items-center justify-center" style={{ gap: '1vw' }}>
            <button onClick={toggleLanguage} className="hover:opacity-80">
              {i18n.language === "el" ? "English" : "Ελληνικά"}
            </button>
            <span>•</span>
            <button onClick={toggleDarkMode} title="Theme toggle" className="p-1 hover:opacity-80 transition">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <span>•</span>
            <span>{t("footer")}</span>
            <span>•</span>
            <span>🄯 2025 geotsa</span>
          </div>
        </div>
      </div>

      <PWAInstallPrompt />
    </div>
  )
}
