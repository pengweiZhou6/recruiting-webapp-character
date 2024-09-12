import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { SKILL_LIST } from "../../constants/consts"
import {
  setCurrentIndex,
  setBestCharacterIndex,
} from "../../slices/charactersSlice"
import { calculateModifier } from "../../utils/helper"

const PartySkillCheck = ({ characters, bestCharacterIndex }) => {
  const dispatch = useDispatch()

  const [selectedSkill, setSelectedSkill] = useState("")
 
  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value)
  }



  const handlePick = () => {
    if (!selectedSkill) return

    // Find the character with the highest skill total, if there is multipl option, picked the first best
  
    const bestCharacter = characters.reduce(
      (best, character, index) => {
        if (!character.status) {
          return best;
        }
        const skillData = SKILL_LIST.find(
          (skill) => skill.name === selectedSkill
        )
        const modifier = calculateModifier(
          character.attributes[skillData.attributeModifier]
        )
        const allocatedSkillPoints =
          character.allocatedSkillPoints?.[selectedSkill] || 0
        const characterSkillTotal = modifier + allocatedSkillPoints

        return characterSkillTotal > best.total
          ? { character, total: characterSkillTotal, index }
          : best
      },
      { character: null, total: -Infinity, index: -1 }
    )

    // If there is the best, jump to bestCharacter tab
    if (bestCharacter.character) {
      dispatch(setCurrentIndex(bestCharacter.index))
    }
    dispatch(setBestCharacterIndex(bestCharacter.index))
  }

  return (
    <div>
      <h2>Find Best from Party</h2>

      <label>
        Select Skill:
        <select value={selectedSkill} onChange={handleSkillChange}>
          <option value="">-- Select a Skill --</option>
          {SKILL_LIST.map((skill) => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={handlePick}
        disabled={!selectedSkill || characters.length === 0}
      >
        Pick Best Character
      </button>
      {bestCharacterIndex !== null &&
        (bestCharacterIndex !== -1 ? (
          <div>
            <p>{characters[bestCharacterIndex].name} is the best choice!</p>
          </div>
        ) : (
          <div>
            <p>There is no the best choice!</p>
          </div>
        ))}
    </div>
  )
}

export default PartySkillCheck
