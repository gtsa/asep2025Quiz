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

  const fetchQuestions = async (limit?: number) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/questions?limit=${limit}`)
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

  const selectAnswer = (selectedLetter: string) => {
    const currentQuestion = questions[quizState.currentQuestionIndex]
    if (!currentQuestion) return

    const actualAnswer = currentQuestion.options[selectedLetter as keyof typeof currentQuestion.options]

    setQuizState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: actualAnswer,
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
    const correctCount = questions.reduce((acc, question) => {
      const userAnswer = quizState.answers[question.id]
      if (userAnswer && userAnswer === question.correctAnswer) {
        return acc + 1
      }
      return acc
    }, 0)

    setQuizState((prev) => ({
      ...prev,
      score: correctCount,
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
