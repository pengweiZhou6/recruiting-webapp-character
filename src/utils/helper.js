
import {
  ATTRIBUTE_LIST,
  MAX_ATTRIBUTE_POINT,
  CLASS_LIST,
  url,
} from "../constants/consts"
import { setCharacters } from "../slices/charactersSlice"

export const calculateModifier = (value) => Math.floor((value - 10) / 2)

export const calculateTotalAllocatedSkillPoints = (character) => {
  return Object.values(character.allocatedSkillPoints || {}).reduce(
    (sum, points) => sum + points,
    0
  )
}

export const calculateSkillPoints = (character) => {
  const intelligenceModifier = calculateModifier(
    character.attributes.Intelligence
  )
  const baseSkillPoints = 10 + 4 * intelligenceModifier
  const allocatedSkillPoints = calculateTotalAllocatedSkillPoints(character)
  return baseSkillPoints - allocatedSkillPoints
}

export const isOverMaxAttrPoint = (character) => {
  return (
    ATTRIBUTE_LIST.reduce(
      (sum, attribute) => sum + character.attributes[attribute],
      0
    ) > MAX_ATTRIBUTE_POINT
  )
}

export const checkClassRequirements = (character) => {
  const activeClasses = []
  Object.entries(CLASS_LIST).forEach(([className, classAttributes]) => {
    const fulfillsClass = Object.entries(classAttributes).every(
      ([attr, value]) => character.attributes[attr] >= value
    )
    if (fulfillsClass) {
      activeClasses.push(className)
    }
  })
  return activeClasses
}

export const fetchCharacters = async (dispatch) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to retrieve characters")
    }
    
    const data = await response.json()

    if (!data.body || !data.body.characters) {
      window.alert("No characters stored");
      return
    }

    dispatch(setCharacters(data.body.characters))
  } catch (error) {
    window.alert("Error fetching characters")
  }
}

export const postCharacters = async (characters) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ characters }),
    })

    if (!response.ok) {
      throw new Error("Failed to save characters")
    }
    window.alert("Save successful")
  } catch (error) {
    window.alert("Error saving characters")
  }
}
