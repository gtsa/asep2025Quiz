export interface Question {
  id: string
  question?: string
  options: Record<string, string> 
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

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: 
        | { props?: Record<string, any> }
        | { u: string }
    ) => void;
  }
}
