import { useState } from "react";
import Die from "./Die";

export default function App() {


// Hold generated array into state
const [diceNumbers, setDiceNumbers] = useState(generateAllNewDice())


// Generate array with 10 items with random value from 1 to 6
function generateAllNewDice() {
  return new Array(10)                              // generate new Array with 10 item spaces
    .fill(0)                                        // fill array with items with value of 0
    .map(() => Math.floor(Math.random() * 6) + 1)   // map over every item and transform 0 into a random number between 1 and 6
}


const rollDice = () => {
  setDiceNumbers(generateAllNewDice)
}


// Map over state items to generate Die components 
const diceElements = diceNumbers.map(die => {
  return <Die value={die}/>
})


  return (
    <main className="container">

      <div className="dice-container">
        {diceElements}
      </div>

      <button className="roll-btn">Roll</button>
    </main>
  )
}