export const ATTRIBUTE_LIST = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
]

export const CLASS_LIST = {
  Barbarian: {
    Strength: 14,
    Dexterity: 9,
    Constitution: 9,
    Intelligence: 9,
    Wisdom: 9,
    Charisma: 9,
  },
  Wizard: {
    Strength: 9,
    Dexterity: 9,
    Constitution: 9,
    Intelligence: 14,
    Wisdom: 9,
    Charisma: 9,
  },
  Bard: {
    Strength: 9,
    Dexterity: 9,
    Constitution: 9,
    Intelligence: 9,
    Wisdom: 9,
    Charisma: 14,
  },
}

export const INITIAL_CHARACTER = {
  name: "",
  attributes: [],
  skillPoints: 10,
  allocatedSkillPoints: {},
  status: 0,
  activeClass: [],
  challegeSkill: "",
  DC: 20,
  rolledValue: 0,
}

export const SKILL_LIST = [
  { name: "Acrobatics", attributeModifier: "Dexterity" },
  { name: "Animal Handling", attributeModifier: "Wisdom" },
  { name: "Arcana", attributeModifier: "Intelligence" },
  { name: "Athletics", attributeModifier: "Strength" },
  { name: "Deception", attributeModifier: "Charisma" },
  { name: "History", attributeModifier: "Intelligence" },
  { name: "Insight", attributeModifier: "Wisdom" },
  { name: "Intimidation", attributeModifier: "Charisma" },
  { name: "Investigation", attributeModifier: "Intelligence" },
  { name: "Medicine", attributeModifier: "Wisdom" },
  { name: "Nature", attributeModifier: "Intelligence" },
  { name: "Perception", attributeModifier: "Wisdom" },
  { name: "Performance", attributeModifier: "Charisma" },
  { name: "Persuasion", attributeModifier: "Charisma" },
  { name: "Religion", attributeModifier: "Intelligence" },
  { name: "Sleight of Hand", attributeModifier: "Dexterity" },
  { name: "Stealth", attributeModifier: "Dexterity" },
  { name: "Survival", attributeModifier: "Wisdom" },
]

export const MAX_ATTRIBUTE_POINT = 70
export const githubUsername = "pengweiZhou6"
export const url = `https://recruiting.verylongdomaintotestwith.ca/api/${githubUsername}/character`
export const DEFAULT_DC = 20