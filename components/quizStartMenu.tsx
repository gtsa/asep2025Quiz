"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type QuizStartMenuProps = {
  onStart: (questionCount: number | "max") => void
  isShuffled: boolean
  setIsShuffled: (value: boolean) => void
}

export const QuizStartMenu: React.FC<QuizStartMenuProps> = ({ onStart, isShuffled, setIsShuffled }) => {
  const [customCount, setCustomCount] = useState("")

  const handleCustomStart = () => {
    const parsed = parseInt(customCount, 10)
    console.log("Parsed custom count:", parsed)
    if (!isNaN(parsed) && parsed > 0) {
      onStart(parsed)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center">Welcome to the Quiz</h1>
      <p className="text-muted-foreground text-center">Choose how many questions you want to practice with:</p>

      <label className="text-sm text-gray-600 flex items-center gap-2">
        <input
          type="checkbox"
          checked={isShuffled}
          onChange={(e) => setIsShuffled(e.target.checked)}
        />
        Shuffle answers
      </label>

      {/* Predefined Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        {[10, 20, 50].map((count: number) => (
            <Button
                key={count}
                size="lg"
                onClick={() => {
                    console.log("Click count:", count)
                    onStart(Number(count))
                }}
            >
                {count} Questions
            </Button>
        ))}

        {/* All = no count specified */}
        <Button key="all" size="lg" onClick={() => onStart('max')}>
          All Questions
        </Button>
      </div>

      {/* Custom Input */}
      <div className="flex gap-2 mt-4">
        <Input
          type="number"
          min={1}
          placeholder="Enter number"
          value={customCount}
          onChange={(e) => setCustomCount(e.target.value)}
          className="w-32"
        />
        <Button onClick={handleCustomStart} disabled={!customCount || parseInt(customCount) <= 0}>
          Start Custom
        </Button>
      </div>
    </div>
  )
}
