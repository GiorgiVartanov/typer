import { useState, useEffect, useRef } from "react"

import Word from "./Word"
import ActiveWord from "./ActiveWord"

interface Props {
  text: string
}

const Text = ({ text }: Props) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [correctLetters, setCorrectLetters] = useState<(0 | 1 | 2)[][]>([])
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<number | null>(null)

  const timerRef = useRef<number | null>(null)

  const goToNextWord = (correctLetters: (0 | 1 | 2)[]) => {
    setCurrentWordIndex((prevState) => prevState + 1)
    setCorrectLetters((prevState) => {
      if (prevState) {
        return [...prevState, correctLetters]
      } else {
        return [correctLetters]
      }
    })
  }

  // calculates user's word accuracy after each typed word
  const calculateAccuracy = () => {
    const percentageOfCorrectWords =
      (correctLetters.filter((wordCorrectLetters) =>
        wordCorrectLetters.every((letter) => letter === 2)
      ).length /
        correctLetters.length) *
      100

    const accuracy = percentageOfCorrectWords || 0

    return `${accuracy.toFixed(2)}%`
  }

  const startTimer = () => {
    if (startTime === null) {
      setStartTime(Date.now())
    }
  }

  const handleKeyPress = () => {
    if (!isTyping) {
      setIsTyping(true)
      startTimer()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [isTyping])

  useEffect(() => {
    startTimer()

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current)
      }
    }
  }, [])

  const hasFinished = currentWordIndex === text.split(" ").length

  const endTime = Date.now()
  const elapsedTime =
    startTime !== null
      ? `${((endTime - startTime) / 1000).toFixed(2)} seconds`
      : ""

  return (
    <div className="text-component">
      <div className="text-panel">
        <div className="word-count">{calculateAccuracy()}</div>
        <div className="time">{hasFinished ? elapsedTime : ""}</div>
      </div>

      <div className="text">
        {text.split(" ").map((word, index) => {
          if (index === currentWordIndex) {
            return (
              <ActiveWord
                key={index}
                word={word}
                goToNextWord={goToNextWord}
                isLastWord={index === text.split(" ").length - 1}
              />
            )
          } else {
            return (
              <Word
                key={index}
                word={word}
                correctLetters={correctLetters[index]}
              />
            )
          }
        })}
      </div>
    </div>
  )
}
export default Text
