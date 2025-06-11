export interface Question {
  id: string
  question?: string
  options: {
    α: string
    β: string
    γ: string
    δ: string
  }
  correctAnswer?: string
  correctAnswerKey?: string
  category?: string
  difficulty?: string
  indexInCategory?: number
}

export interface QuizState {
  currentQuestionIndex: number
  answers: Record<string, string>
  score: number
  isCompleted: boolean
}

export interface CSVRow {
  [key: string]: string
}
