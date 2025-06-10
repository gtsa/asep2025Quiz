"use client"

import { useState, useEffect } from "react"
import type { Question, QuizState } from "@/lib/types"

export function useQuiz() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    isCompleted: false,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/questions")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch questions")
      }

      setQuestions(data.questions)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load questions")
    } finally {
      setLoading(false)
    }
  }

  const selectAnswer = (answer: string) => {
    const currentQuestion = questions[quizState.currentQuestionIndex]
    if (!currentQuestion) return

    setQuizState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: answer,
      },
    }))
  }

  const nextQuestion = () => {
    if (quizState.currentQuestionIndex < questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }))
    } else {
      completeQuiz()
    }
  }

  const previousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }))
    }
  }

  const completeQuiz = () => {
    setQuizState((prev) => ({
      ...prev,
      isCompleted: true,
    }))
  }

  const resetQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      isCompleted: false,
    })
  }

  const currentQuestion = questions[quizState.currentQuestionIndex]
  const currentAnswer = currentQuestion ? quizState.answers[currentQuestion.id] : undefined
  const progress = questions.length > 0 ? ((quizState.currentQuestionIndex + 1) / questions.length) * 100 : 0

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
  }
}
