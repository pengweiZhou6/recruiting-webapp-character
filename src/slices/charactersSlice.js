import { createSlice } from "@reduxjs/toolkit"
import { ATTRIBUTE_LIST, INITIAL_CHARACTER } from "../constants/consts"
import {
  isOverMaxAttrPoint,
  calculateSkillPoints,
  checkClassRequirements,
} from "../utils/helper"

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    currentIndex: null,
    bestCharacterIndex: null,
  },
  reducers: {
    addCharacter: (state) => {
      const newCharacter = {
        ...INITIAL_CHARACTER,
        name: `Character ${state.characters.length + 1}`,
        attributes: ATTRIBUTE_LIST.reduce((acc, attribute) => {
          acc[attribute] = 10
          return acc
        }, {}),
        status: 1,
      }
      state.characters.push(newCharacter)
      state.currentIndex = state.characters.length - 1
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload
    },
    setCharacters: (state, action) => {
      state.characters = action.payload
    },
    removeCharacter: (state, action) => {
      const index = action.payload
      state.characters[index].status = 0
    },
    updateCharacterAttribute: (state, action) => {
      const { index, attribute, value } = action.payload
      const character = state.characters[index]

      const tempCharacter = {
        ...character,
        attributes: {
          ...character.attributes,
          [attribute]: value,
        },
      }

      if (isOverMaxAttrPoint(tempCharacter)) {
        window.alert("Total attribute points cannot exceed 70.")
        return
      }

      const newSkillPoints = calculateSkillPoints(tempCharacter)

      if (newSkillPoints < 0) {
        window.alert("Skill points cannot be less than 0.")
        return
      }

      const activeClasses = checkClassRequirements(tempCharacter)

      character.activeClass = activeClasses
      character.attributes[attribute] = value
      character.skillPoints = newSkillPoints
    },
    addSkillPoint: (state, action) => {
      const { index, skill, points } = action.payload
      const character = state.characters[index]

      if (character.skillPoints >= points) {
        if (!character.allocatedSkillPoints[skill]) {
          character.allocatedSkillPoints[skill] = 0
        }
        character.allocatedSkillPoints[skill] += points
        character.skillPoints -= points
      }
    },

    removeSkillPoint: (state, action) => {
      const { index, skill, points } = action.payload
      const character = state.characters[index]

      if (
        character.allocatedSkillPoints[skill] &&
        character.allocatedSkillPoints[skill] > 0
      ) {
        character.allocatedSkillPoints[skill] -= points
        character.skillPoints += points
      }
    },
    setCharacterChallegeSkill: (state, action) => {
      const { index, skill } = action.payload
      const character = state.characters[index]
      character.challegeSkill = skill
    },
    setCharacterDC: (state, action) => {
      const { index, goal } = action.payload
      const character = state.characters[index]
      character.DC = goal
    },
    rollCharacterDice: (state, action) => {
      const index = action.payload
      const character = state.characters[index]
      character.rolledValue = Math.floor(Math.random() * 20) + 1
    },
    setBestCharacterIndex: (state, action) => {
      const index = action.payload
      state.bestCharacterIndex = index
    },
    resetAllCharacters: (state) => {
      state.characters = []
    },
  },
})
export const {
  addCharacter,
  setCurrentIndex,
  removeCharacter,
  updateCharacterAttribute,
  addSkillPoint,
  removeSkillPoint,
  setCharacterChallegeSkill,
  setCharacterDC,
  rollCharacterDice,
  resetAllCharacters,
  setBestCharacterIndex,
  setCharacters,
} = charactersSlice.actions
export default charactersSlice.reducer
