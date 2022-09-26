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

  const [pickedword, setPickedword] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    //Pega a categoria aleatoria
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]
    //console.log(category)

    //Pega a palavra aleatoria dessa categoria aleatoria
    const word =
      words[category][Math.floor(Math.random() * words[category].length)]

    //console.log(word)

    return { word, category }
  }

  //Função inicia o jogo
  const startGame = () => {
    const { word, category } = pickWordAndCategory()
    console.log(word, category)

    //Cria o array de letras
    let wordLetters = word.split('')
    wordLetters = wordLetters.map(l => l.toLowerCase())
    console.log(wordLetters)

    //Limpa os estados
    setPickedword(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }

  //Processa a letra colocada
  const verifyLetter = letter => {
    const normalizesLetter = letter.toLowerCase()

    if (
      guessedLetters.includes(normalizesLetter) ||
      wrongLetters.includes(normalizesLetter)
    ) {
      return
    }

    if (letters.includes(normalizesLetter)) {
      setGuessedLetters(actualGuessedLetters => [
        ...actualGuessedLetters,
        normalizesLetter
      ])
    } else {
      setWrongLetters(actualWrongLetters => [
        ...actualWrongLetters,
        normalizesLetter
      ])
    }

    console.log(guessedLetters)
    console.log(wrongLetters)
    // setGameStage(stages[2].name)
    // console.log(letter)
  }

  //Reinicia jogo
  const retry = () => {
    setGameStage(stages[0].name)
  }

  //console.log(words)

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (
        <Game
          verifyLetter={verifyLetter}
          pickedword={pickedword}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  )
}

export default App
