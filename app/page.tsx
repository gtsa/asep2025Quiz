import { Quiz } from "@/components/quiz"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">ΑΣΕΠ Practice Quiz</h1>
            <p className="text-sm sm:text-base text-gray-600">Test your knowledge with our interactive questionnaire</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-6 sm:py-8">
        <Quiz />
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-xs text-gray-500">Swipe or tap to navigate • Optimized for mobile devices</p>
        </div>
      </div>
    </div>
  )
}
