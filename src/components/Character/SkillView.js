import React from "react"
import { useDispatch } from "react-redux"
import { SKILL_LIST } from "../../constants/consts"
import { addSkillPoint, removeSkillPoint } from "../../slices/charactersSlice"
import { calculateModifier } from "../../utils/helper"

const SkillView = ({ character, currentIndex }) => {
  const dispatch = useDispatch()

  const handleAddSkillPoint = (skillName, points) => {
    dispatch(addSkillPoint({ index: currentIndex, skill: skillName, points }))
  }

  const handleRemoveSkillPoint = (skillName, points) => {
    dispatch(
      removeSkillPoint({ index: currentIndex, skill: skillName, points })
    )
  }

  if (!character.status) return

  return (
    <div>
      <h2>Skills</h2>
      <p>Available Skill Points: {character.skillPoints}</p>
      <div>
        {SKILL_LIST.map((skill) => {
          const attributeModifier = calculateModifier(
            character.attributes[skill.attributeModifier]
          )
          const allocatedPoints =
            character.allocatedSkillPoints[skill.name] || 0
          const totalSkillValue = attributeModifier + allocatedPoints

          return (
            <div key={skill.name}>
              <span>{skill.name}</span>
              <span>
                : {attributeModifier} ({skill.attributeModifier}) +{" "}
                {allocatedPoints} (SP) = {totalSkillValue}
              </span>
              <button onClick={() => handleAddSkillPoint(skill.name, 1)}>
                +
              </button>
              <button
                onClick={() => handleRemoveSkillPoint(skill.name, 1)}
                disabled={allocatedPoints === 0}
              >
                -
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SkillView
