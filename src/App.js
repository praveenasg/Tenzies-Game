import './App.css';
import Die from './Die.js';
import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

function App() {

  const [arrayOfNumbers, setArrayOfNumbers] = React.useState(allnewdice())
  const allEqual = arrayOfNumbers.every((arr) => arr.value === arrayOfNumbers[0].value)
  const [changeButton, setChangeButton] = React.useState(false)

  function allnewdice() {
    let num = []
    for (let i = 0; i < 10; i++) {
      num.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      })
    }
    return num
  }

  function rollnewdice() {
    if (allEqual) {
      setArrayOfNumbers(allnewdice())
      setChangeButton(!allEqual)
    }
    else {
      setArrayOfNumbers(olddice => olddice.map(die => {
        return die.isHeld === true ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
      }))
    }
  }

  function hold(id) {
    setChangeButton(allEqual)
    setArrayOfNumbers(olddice => olddice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const dieelements = arrayOfNumbers.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holddice={() => hold(die.id)} />)
  return (

    <div className="App">
      <div className='Tenzies-outlerlayer'>
        <div className='Tenzies-innerlayer'>
          <h2 className='Title'>Tenzies</h2>
          <p className='Paragraph'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='Dice'>
            {dieelements}
          </div>
          {changeButton ?
            <>
              <Confetti />
              <button className='submit-button' onClick={rollnewdice}>New Game</button>
            </> :
            <button className='submit-button' onClick={rollnewdice}>Roll</button>}
        </div>
      </div>
    </div >

  );
}

export default App;
