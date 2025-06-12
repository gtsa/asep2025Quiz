interface ProgressBarProps {
  progress: number
  className?: string
}

export function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  return (
    <div className="w-full space-y-1">
      <div className={`w-full bg-gray-200 rounded-full h-1 ${className}`}>
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  )
}
