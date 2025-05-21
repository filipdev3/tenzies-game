import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti"
import Die from "./Die";
import Stats from "./Stats";

export default function App() {

// Hold generated array into state
const [dice, setDice] = useState(() => generateAllNewDice())

// Start game state to decide which button to display on page
const [start, setStart] = useState(false)


// States for counting time 
const [time, setTime] = useState(0)
const [isRunning, setIsRunning] = useState(false)


// State for counting rolls 
const [countRolls, setCountRolls] = useState(0)


// State for best time with lazy initialization 
const [bestTime, setBestTime] = useState(() => {
  return JSON.parse(localStorage.getItem("bestTime")) || null
})


// State for best rolls count with lazy initialization 
const [fewestRolls, setFewestRolls] = useState(() => {
  return JSON.parse(localStorage.getItem("fewestTime")) || null
})


// Game won variable
const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)



// Timer function
useEffect(() => {
  let interval;
  if(isRunning) {
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000)
  }
  return () => clearInterval(interval)
}, [isRunning, gameWon])

//Ref for button to access to it when game is won
const buttonRef = useRef(null)


// Get window hight and width for confetti
const width = window.innerWidth
const height = window.innerHeight

// Focusig "New Game" button if game is won
useEffect(() => {
  if(gameWon) {
    buttonRef.current.focus()
    setIsRunning(false)

    // Update best time in localStorage
    if(bestTime === null || time < bestTime){
      localStorage.setItem("bestTime", JSON.stringify(time))
      setBestTime(time)
    }

    // Update fewest roll count in localStorage
    if(fewestRolls === null || countRolls < fewestRolls){
      localStorage.setItem("fewestRolls", JSON.stringify(countRolls))
      setFewestRolls(countRolls)
    }

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

    if(!gameWon){
      setCountRolls(prevRolls => prevRolls + 1)
    }
  
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

// New game function
const newGame = () => {
  setStart(true)
  setIsRunning(true)
  setCountRolls(0)
  setDice(generateAllNewDice())
}


  return (
    <>
      <div aria-live="polite" className="win-message">
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>

      {gameWon && <Confetti width={width} height={height}/>}

      {gameWon ? 
      
      <div className="stats-holder">
        <Stats time={time} countRolls={countRolls} bestTime={bestTime} fewestRolls={fewestRolls}/>
        <button className="new-game-btn" onClick={newGame} ref={buttonRef}>New Game</button> 
      </div>

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
        <h3>Rolls: {countRolls}</h3>
        <h3>Time: {time}s</h3>
      </main>
      }
    </>
  )
}