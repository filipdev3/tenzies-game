import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti"
import Die from "./Die";

export default function App() {

// Hold generated array into state
const [dice, setDice] = useState(() => generateAllNewDice())

// Start game state to decide which button to display on page
const [start, setStart] = useState(false)

//Ref for button to access to it when game is won
const buttonRef = useRef(null)


// Game won variable
const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

// Get window hight and width for confetti
const width = window.innerWidth
const height = window.innerHeight

// Focusig "New Game" button if game is won
useEffect(() => {
  if(gameWon) {
    buttonRef.current.focus()
  } 
}, [gameWon])

// Generate array with 10 items with random value from 1 to 6
function generateAllNewDice() {
  return new Array(10)
    .fill(0)
    .map(() => ({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid()
    }))
}



// Roll dice / New game function
const handleClick = () => {
  
    setDice(prevDice => prevDice.map(die => 
      !die.isHeld ? 
        {...die, value: Math.floor(Math.random() * 6 + 1)} : 
        die
    ))
  
}


// Function for hold the die
const hold = (id) => {
    setDice(prevDice => prevDice.map(die => 
      die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
      )
    )
}


// Map over state items to generate Die components 
const diceElements = dice.map(die => {
  return <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            hold={() => hold(die.id)}   // closure that captures die.id 
          />
})


const newGame = () => {
  setStart(true)
  setDice(generateAllNewDice())
}


  return (
    <>
      <div aria-live="polite" className="win-message">
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>

      {gameWon && <Confetti width={width} height={height}/>}

      {gameWon ? <button className="new-game-btn" onClick={newGame} ref={buttonRef}>New Game</button> 
      
      : 

      <main className="container">

        <h1 className="title">Tenzies</h1>
        <p className="description">Roll untill all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>


        {start === false || gameWon 
        
        ?

        <button className="roll-btn" onClick={newGame} >New Game</button>
        
        :

        <button className="roll-btn" onClick={handleClick}>Roll</button>
        }
      </main>
      }
    </>
  )
}