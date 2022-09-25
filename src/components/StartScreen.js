import './StartScreen.css'

const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
      <h1>Palavra Secreta</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      {/* Chama a função de retorno que está la no app.js */}
      <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen
