export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer?: string
  category?: string
  difficulty?: string
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
