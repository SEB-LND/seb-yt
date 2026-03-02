import React, { useState } from 'react'
import { ChipsBar } from '../ChipsBar/ChipsBar'
import Videos from '../../pages/MainPage'

const Main = () => {
  const [selectedChipIndex, setSelectedChipIndex] = useState(0)

  return (
    <main>
      <ChipsBar
        selectedChipIndex={selectedChipIndex}
        setSelectedChipIndex={setSelectedChipIndex}
      />
      <Videos selectedChipIndex={selectedChipIndex} />
    </main>
  )
}

export default Main
