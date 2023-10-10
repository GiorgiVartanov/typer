import { useEffect, useState } from "react"

import Letter from "./Letter"

interface Props {
  word: string
  goToNextWord: (correctLetters: (0 | 1 | 2)[]) => void
  isLastWord: boolean
}

const ActiveWord = ({ word, goToNextWord, isLastWord }: Props) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0)
  const [correctLetters, setCorrectLetters] = useState<(0 | 1 | 2)[]>(
    Array.from({ length: word.length }, () => 0)
  )

  const handleKeyPress = (e: KeyboardEvent) => {
    const pressedKey = e.key

    if (
      [
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "F11",
        "F12",
      ].includes(pressedKey)
    )
      return

    // if user presses on a Backspace and they are not on a first character of a word, they will move 1 letter back
    if (pressedKey === "Backspace" && currentLetterIndex > 0) {
      setCurrentLetterIndex((prevState) => prevState - 1)
      setCorrectLetters((prevState) => {
        const savedPrevState = prevState
        savedPrevState[currentLetterIndex - 1] = 0
        return savedPrevState
      })

      return
    }

    if (pressedKey === "Backspace") return

    // if user presses on space and they have types last character, they will be moved to the next word
    if (pressedKey === " " && currentLetterIndex > word.length - 1) {
      goToNextWord(correctLetters)
    }

    if (isLastWord && currentLetterIndex === word.length - 1) {
      goToNextWord(correctLetters.map((letter) => (letter === 0 ? 2 : letter)))
    }

    // if user presses on Enter or Tab they are automatically moved to the next word
    if (["Enter", "Tab"].includes(pressedKey)) {
      goToNextWord(correctLetters.map((letter) => (letter === 0 ? 1 : letter)))
    } else {
      if (pressedKey === word[currentLetterIndex]) {
        // pressed character is correct
        setCorrectLetters((prevState) => {
          const savedPrevState = prevState
          savedPrevState[currentLetterIndex] = 2
          return savedPrevState
        })
      } else {
        // pressed character is incorrect
        setCorrectLetters((prevState) => {
          const savedPrevState = prevState
          savedPrevState[currentLetterIndex] = 1
          return savedPrevState
        })
      }

      // moving to the next character
      setCurrentLetterIndex((prevState) => prevState + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [currentLetterIndex])

  return (
    <div className="word">
      {word.split("").map((letter, index) => (
        <Letter
          key={index}
          letter={letter}
          isCurrentLetter={index === currentLetterIndex}
          isCorrect={correctLetters[index]}
        />
      ))}
    </div>
  )
}
export default ActiveWord
