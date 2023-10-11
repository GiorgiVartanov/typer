import { useEffect, useState, useRef } from "react"

import Letter from "./Letter"

interface Props {
  word: string
  goToNextWord: (correctLetters: (0 | 1 | 2)[]) => void
  isLastWord: boolean
}

const ActiveWord = ({ word, goToNextWord, isLastWord }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0)
  const [correctLetters, setCorrectLetters] = useState<(0 | 1 | 2)[]>(
    Array.from({ length: word.length }, () => 0)
  )

  const handleKeyPress = (e: KeyboardEvent) => {
    const pressedKey = e.key

    // ignores certain keys that should not trigger any action
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
        "Alt",
        "Esc",
        "Escape",
        "CapsLock",
        "Meta", // windows key
        "ContextMenu",
        "NumLock",
        "Insert",
        "Home",
        "PageUp",
        "Delete",
        "End",
        "PageDown",
        "ScrollLock",
        "Pause", // Pause Break key
        "Shift",
      ].includes(pressedKey)
    )
      return

    // if the user presses Backspace and they are not on the first character of a word, move back one letter
    if (pressedKey === "Backspace" && currentLetterIndex > 0) {
      setCurrentLetterIndex((prevState) => prevState - 1)
      // marks erased character as letter that was not typed (0)
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

    // if it's the last word and the user has typed the last letter, move to the next word
    if (isLastWord && currentLetterIndex === word.length - 1) {
      goToNextWord(correctLetters.map((letter) => (letter === 0 ? 2 : letter)))
    }

    // if user presses on Enter or Tab, they are automatically moved to the next word
    if (["Enter", "Tab"].includes(pressedKey)) {
      goToNextWord(correctLetters.map((letter) => (letter === 0 ? 1 : letter)))
    } else {
      if (pressedKey === word[currentLetterIndex]) {
        // if the pressed character is correct, mark it as correct (2)
        setCorrectLetters((prevState) => {
          const savedPrevState = prevState
          savedPrevState[currentLetterIndex] = 2
          return savedPrevState
        })
      } else {
        // if the pressed character is incorrect, mark it as incorrect (1)
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
    // adds event listener that is triggered on each key press
    window.addEventListener("keydown", handleKeyPress)

    // cleans the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [currentLetterIndex])

  useEffect(() => {
    if (!inputRef?.current) return

    // focuses on the input, so mobile user will be able to type
    inputRef.current.focus()
  }, [])

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
      <input
        type="text"
        ref={inputRef}
        className="hidden-input"
      />
    </div>
  )
}
export default ActiveWord
