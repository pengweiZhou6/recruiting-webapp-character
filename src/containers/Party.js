import React from "react"
import PartyAction from "../components/Party/PartyAction"
import PartySkillCheck from "../components/Party/PartySkillCheck"
import { useSelector } from "react-redux"

const Party = () => {
  const characters = useSelector((state) => state.characters.characters)
  const bestCharacterIndex = useSelector(
    (state) => state.characters.bestCharacterIndex
  )

  return (
    <>
      <PartyAction characters={characters} />
      <PartySkillCheck
        characters={characters}
        bestCharacterIndex={bestCharacterIndex}
      />
    </>
  )
}

export default Party
