import React from "react"
import { useDispatch } from "react-redux"
import { setCurrentIndex } from "../../slices/charactersSlice"

const TabControl = ({ characters, currentIndex }) => {
  const dispatch = useDispatch()

  return (
    <div className="tabs">
      {characters.map((character, index) =>
        character.status ? (
          <button
            key={index}
            onClick={() => dispatch(setCurrentIndex(index))}
            className={currentIndex === index ? "active" : ""}
          >
            {character.name}
          </button>
        ) : null
      )}
    </div>
  )
}

export default TabControl
