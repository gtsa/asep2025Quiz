interface ProgressBarProps {
  progress: number
  className?: string
}

export function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  return (
    <div className="w-full space-y-2">
      <div className={`w-full bg-gray-200 rounded-full h-3 ${className}`}>
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      <div className="text-center">
        <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
      </div>
    </div>
  )
}
