const calculateWPM = (
  text: string,
  timeInSeconds: number,
  correctLetters: number[][]
): number => {
  // counts amount of correct words
  const correctWords = correctLetters
    .map((word: number[]) => word.every((letter: number) => letter === 2))
    .filter((item) => item !== false).length

  const timeInMinutes = timeInSeconds / 60

  // calculates wpm by dividing amount of correct words by minutes
  const wpm = correctWords / timeInMinutes

  return wpm
}

export default calculateWPM
