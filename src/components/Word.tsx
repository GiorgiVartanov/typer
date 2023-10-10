import Letter from "./Letter"

interface Props {
  word: string
  correctLetters?: (0 | 1 | 2)[]
}

const Word = ({ word, correctLetters }: Props) => {
  return (
    <div className="word final-word">
      {word.split("").map((letter, index) => (
        <Letter
          key={index}
          letter={letter}
          isCurrentLetter={false}
          isCorrect={correctLetters?.[index]}
        />
      ))}
    </div>
  )
}
export default Word
