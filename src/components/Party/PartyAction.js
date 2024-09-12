import React from "react"
import { useDispatch } from "react-redux"
import { addCharacter, resetAllCharacters ,setBestCharacterIndex} from "../../slices/charactersSlice"
import { postCharacters } from "../../utils/helper"

const PartyAction = ({ characters }) => {
  const dispatch = useDispatch()

  const handleAddCharacter = () => {
    dispatch(addCharacter())
  }

  const handleResetAll = () => {
    dispatch(resetAllCharacters())
    dispatch(setBestCharacterIndex(null))
  }

  const handleSaveAll = () => {
    postCharacters(characters)
  }

  return (
    <div>
      <button onClick={handleAddCharacter}>Add Character</button>
      <button onClick={handleResetAll}>Reset All Characters</button>
      <button onClick={handleSaveAll}>Save All Characters</button>
    </div>
  )
}

export default PartyAction
