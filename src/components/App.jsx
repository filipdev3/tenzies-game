import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";

export default function App() {


// Hold generated array into state
const [dice, setDice] = useState(generateAllNewDice())


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



// Roll dice function
const rollDice = () => {
  setDice(generateAllNewDice)
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


  return (
    <main className="container">

      <div className="dice-container">
        {diceElements}
      </div>

      <button className="roll-btn" onClick={rollDice}>Roll</button>
    </main>
  )
}