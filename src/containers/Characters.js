import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CharacterView from "../components/Character/CharacterView"
import ClassView from "../components/Character/ClassView"
import SkillView from "../components/Character/SkillView"
import TabControl from "../components/Character/TabControl"
import SkillCheck from "../components/Character/SkillCheck"
import { INITIAL_CHARACTER } from "../constants/consts"
import { fetchCharacters } from "../utils/helper"

const Character = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    fetchCharacters(dispatch)
  }, [dispatch])

  const currentIndex = useSelector((state) => state.characters.currentIndex)
  const characters = useSelector((state) => state.characters.characters)
  const character = characters[currentIndex] || INITIAL_CHARACTER

  return (
    <>
      <h1>Characters</h1>
      <TabControl characters={characters} currentIndex={currentIndex} />
      <CharacterView character={character} currentIndex={currentIndex} />
      <SkillCheck character={character} currentIndex={currentIndex} />
      <ClassView character={character} />
      <SkillView character={character} currentIndex={currentIndex} />
    </>
  )
}

export default Character
