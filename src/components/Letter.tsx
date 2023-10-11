interface Props {
  letter: string
  isCurrentLetter: boolean
  isCorrect?: 0 | 1 | 2
}

const Letter = ({ letter, isCurrentLetter, isCorrect = 0 }: Props) => {
  const color = ["", "incorrect-letter", "correct-letter"][isCorrect]

  return (
    <span
      className={`letter ${color} ${isCurrentLetter ? "active-letter" : ""}`}
    >
      {letter}
    </span>
  )
}
export default Letter
