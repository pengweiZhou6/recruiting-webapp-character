import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { SKILL_LIST,DEFAULT_DC } from "../../constants/consts"
import {
  setCharacterChallegeSkill,
  setCharacterDC,
  rollCharacterDice,
} from "../../slices/charactersSlice"
import { calculateModifier } from "../../utils/helper"

const SkillCheck = ({ character, currentIndex }) => {
  const dispatch = useDispatch()

  const [selectedSkill, setSelectedSkill] = useState("")
  const [goal, setGoal] = useState(DEFAULT_DC)
  const {challegeSkill,rolledValue,DC }=character
  if (!character.status) return

  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value
    setSelectedSkill(selectedSkill)
  }

  const handleGoalChange = (e) => {
    const DC = Number(e.target.value)
    setGoal(DC)
  }

  const handleRoll = () => {
    dispatch(
      setCharacterChallegeSkill({ index: currentIndex, skill: selectedSkill })
    )
    dispatch(setCharacterDC({ index: currentIndex, goal }))
    dispatch(rollCharacterDice(currentIndex))
  }

  const skillData = SKILL_LIST.find((skill) => skill.name === challegeSkill)
  const modifier = skillData
    ? calculateModifier(character.attributes[skillData.attributeModifier])
    : 0
  const allocatedSkillPoints =
    character.allocatedSkillPoints?.[challegeSkill] || 0

  const characterSkillPoints = modifier + allocatedSkillPoints
  const finalResult = rolledValue + characterSkillPoints

  return (
    <div>
      <h2>Skill Check</h2>

      <label>
        Select Skill:
        <select value={selectedSkill || ""} onChange={handleSkillChange}>
          <option value="">-- Select a Skill --</option>
          {SKILL_LIST.map((skill) => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        DC:
        <input
          type="number"
          value={goal}
          onChange={handleGoalChange}
        />
      </label>

      <button onClick={handleRoll} disabled={selectedSkill === ""}>
        Roll
      </button>

      {rolledValue !== 0 && (
        <div>
          <h3>Result:</h3>
          <p>
            Skill: {challegeSkill}:{characterSkillPoints}
            <br />
            You Rolled: {rolledValue} <br />
            The DC was: {DC} <br />
            Your Result: {finalResult} <br />
            {finalResult >= DC ? "Success" : "Failure"}
          </p>
        </div>
      )}
    </div>
  )
}

export default SkillCheck
