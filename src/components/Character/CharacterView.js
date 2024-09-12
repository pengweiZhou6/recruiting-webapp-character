import React from "react"
import { useDispatch } from "react-redux"
import {
  removeCharacter,
  updateCharacterAttribute,
} from "../../slices/charactersSlice"
import { ATTRIBUTE_LIST } from "../../constants/consts"
import { calculateModifier } from "../../utils/helper"

const CharacterView = ({ character, currentIndex }) => {
  const dispatch = useDispatch()

  const handleAttributeChange = (attribute, newValue) => {
    dispatch(
      updateCharacterAttribute({
        index: currentIndex,
        attribute,
        value: newValue,
      })
    )
  }

  const incrementAttribute = (attribute) => {
    const newValue = character.attributes[attribute] + 1
    handleAttributeChange(attribute, newValue)
  }

  const decrementAttribute = (attribute) => {
    const newValue = character.attributes[attribute] - 1
    handleAttributeChange(attribute, newValue)
  }

  const inactivateCharacter = () => {
    dispatch(removeCharacter(currentIndex))
  }

  if (!character.status) {
    return <p>Please select an active character.</p>
  }

  return (
    <div>
      <h3>{character.name}</h3>
      <h2>Attribute</h2>
      <div>
        {ATTRIBUTE_LIST.map((attribute) => (
          <div key={attribute}>
            <label>{attribute}: </label>
            <span>{character.attributes[attribute]}</span>

            <span>
              (Modifier: {calculateModifier(character.attributes[attribute])})
            </span>

            <button onClick={() => incrementAttribute(attribute)}>+</button>
            <button
              onClick={() => decrementAttribute(attribute)}
              disabled={character.attributes[attribute] === 0}
            >
              -
            </button>
          </div>
        ))}
      </div>

      <button onClick={inactivateCharacter}>Set Inactive</button>
    </div>
  )
}

export default CharacterView
