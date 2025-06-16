"use client"

import { useState, useEffect } from "react"
import type { Question, QuizState } from "@/lib/types"

// Utility to shuffle question options once
function shuffleAnswers(questions: Question[]): Question[] {
  return questions.map(q => {
    const entries = Object.entries(q.options)
    const shuffled = entries.sort(() => Math.random() - 0.5)
    const shuffledOptions = Object.fromEntries(shuffled)
    return { ...q, options: shuffledOptions }
  })
}

export function useQuiz() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    isCompleted: false,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const savedCategories = localStorage.getItem("selectedCategories")
    const savedQuestions = localStorage.getItem("shuffledQuestions")
    if (savedCategories) setSelectedCategories(JSON.parse(savedCategories))
    if (savedQuestions) setQuestions(JSON.parse(savedQuestions))
    setLoading(false)
  }, [])

  // Persist to localStorage when changed
  useEffect(() => {
    if (selectedCategories.length > 0) {
      localStorage.setItem("selectedCategories", JSON.stringify(selectedCategories))
    }
  }, [selectedCategories])

  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem("shuffledQuestions", JSON.stringify(questions))
    }
  }, [questions])

  const fetchQuestions = async (limit?: number, categories?: string[]) => {
    try {
      setQuizState({
        currentQuestionIndex: 0,
        answers: {},
        score: 0,
        isCompleted: false,
      })

      setLoading(true)
      const params = new URLSearchParams()
      if (limit !== undefined) params.append("limit", limit.toString())
      if (categories && categories.length > 0) {
        categories.forEach(cat => params.append("categories", cat))
        setSelectedCategories(categories)
      }

      const response = await fetch(`/api/questions?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch questions")
      }

      const shuffled = shuffleAnswers(data.questions)
      setQuestions(shuffled)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load questions")
    } finally {
      setLoading(false)
    }
  }

  const selectAnswer = (selectedLetter: string) => {
    const currentQuestion = questions[quizState.currentQuestionIndex]
    if (!currentQuestion) return

    const actualAnswer = currentQuestion.options[selectedLetter as keyof typeof currentQuestion.options]

    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: actualAnswer,
      },
    }))
  }

  const nextQuestion = () => {
    if (quizState.currentQuestionIndex < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }))
    } else {
      completeQuiz()
    }
  }

  const previousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }))
    }
  }

  const completeQuiz = () => {
    const correctCount = questions.reduce((acc, question) => {
      const userAnswer = quizState.answers[question.id]
      if (userAnswer && userAnswer === question.correctAnswer) {
        return acc + 1
      }
      return acc
    }, 0)

    setQuizState(prev => ({
      ...prev,
      score: correctCount,
      isCompleted: true,
    }))
  }

  const resetQuiz = () => {
    localStorage.removeItem("shuffledQuestions")
    setQuizState({
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      isCompleted: false,
    })
    // retain questions and selectedCategories from localStorage
  }

  const clearLocalStorage = () => {
    localStorage.removeItem("selectedCategories")
    localStorage.removeItem("shuffledQuestions")
    setQuestions([])
    setSelectedCategories([])
    resetQuiz()
  }

  const currentQuestion = questions[quizState.currentQuestionIndex]
  const currentAnswer = currentQuestion ? quizState.answers[currentQuestion.id] : undefined
  const answeredCount = Object.keys(quizState.answers).length
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0

  return {
    questions,
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
    fetchQuestions,
    selectedCategories,
    setSelectedCategories,
    clearLocalStorage,
  }
}
