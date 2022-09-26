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

const guessQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedword, setPickedword] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessQty)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
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
  }, [words])

  //Função inicia o jogo
  const startGame = useCallback(() => {
    //Limpa todas as letras
    clearLettersStates()

    const { word, category } = pickWordAndCategory()
    //console.log(word, category)

    //Cria o array de letras
    let wordLetters = word.split('')
    wordLetters = wordLetters.map(l => l.toLowerCase())
    //console.log(wordLetters)

    //Limpa os estados
    setPickedword(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

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

      setGuesses(actualGuesses => actualGuesses - 1)
    }

    // console.log(guessedLetters)
    // console.log(wrongLetters)
    // setGameStage(stages[2].name)
    // console.log(letter)
  }

  const clearLettersStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //Checa se chegou ao final e Contador de vezes que errou
  useEffect(() => {
    if (guesses <= 0) {
      clearLettersStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  //Checa vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    //Deu Vitoria
    if (guessedLetters.length === uniqueLetters.length) {
      setScore(actualScore => (actualScore += 100))
      //Reseta o jogo com uma nova palavra
      startGame()
    }
    //console.log(uniqueLetters)
  }, [guessedLetters, letters, startGame])

  //Reinicia jogo
  const retry = () => {
    setScore(0)
    setGuesses(guessQty)
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
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  )
}

export default App
