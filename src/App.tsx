import { useState } from "react"

import "./App.scss"

import Text from "./components/Text"

const App = () => {
  const [text, setText] = useState<string>("")
  const [isTextSelected, setIsTextSelected] = useState<boolean>(false)

  const handleOnSaveText = () => {
    setIsTextSelected(true)
  }

  const handleOnReset = () => {
    setIsTextSelected(false)
  }

  const handleOnClean = () => {
    setText("")
  }

  const selectLoremIpsum = () => {
    setText(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    )
    handleOnSaveText()
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <div className="app">
      {isTextSelected ? (
        <>
          <Text text={text} />
          <button
            onClick={handleOnReset}
            className="button"
          >
            Restart
          </button>
        </>
      ) : (
        <div className="text-area-wrapper">
          <textarea
            name=""
            id=""
            placeholder="write or paste a text you want to type"
            className="text-area"
            onChange={handleOnChange}
            value={text}
          ></textarea>
          <div className="button-holder">
            <button
              onClick={selectLoremIpsum}
              className="button"
            >
              Select Lorem Ipsum
            </button>
            <button
              onClick={handleOnSaveText}
              className="button"
            >
              Start
            </button>

            <button
              onClick={handleOnClean}
              className="button"
            >
              Clean
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
