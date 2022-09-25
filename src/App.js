import './App.css'
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

import { useCallback, useEffect, useState } from 'react'

import { wordsList } from './data/words'

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  //Função inicia o jogo
  const startGame = () => {
    setGameStage(stages[1].name)
  }

  //Processa a letra colocada
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  //Reinicia jogo
  const retry = () => {
    setGameStage(stages[0].name)
  }

  console.log(words)

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  )
}

export default App
