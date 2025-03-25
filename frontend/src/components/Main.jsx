import React, { useEffect, useRef } from 'react'
import Confetti from 'react-confetti'

import Die from './Die'

import '../css/Main.css'

const numDice = 10

function Main() {
    const [dice, setDice] = React.useState(() => generateAllNewdice())  // note the () here so the function is only called once at startup
    const [win, setWin] = React.useState(false)
    const [numRolls, setNumRolls] = React.useState(1)
    const [numDiceRolled, setNumDiceRolled] = React.useState(numDice)

    const buttonRef = useRef(null)

    useEffect(() => {
        checkForWin()
    }, [dice])

    useEffect(() => {
        // console.log("win effect")
        win && buttonRef.current.focus()
    }, [win])

    const diceElements = dice.map(dieObj => 
    <Die 
        key={dieObj.id}
        id={dieObj.id} 
        selected={dieObj.selected}
        value={dieObj.value} 
        // NOTE: instead of passing the id as a prop so it can be used as a param when calling the onClick handler 
        // the id could be passed in the onClick hadler definition like this: onClick={() => handleClickSingleDie(dieObj.id)}
        rollDie={handleClickSingleDie}      
        saveDie={handleRightClickSingleDie}
    />)
    
    function generateAllNewdice() {
        // console.log("generating all new dice")
        const diceArray = []
        let randNum = 0;
        for (let i = 0; i < numDice; i++) {
            randNum = Math.ceil(Math.random() * 6)
            // NOTE: instead of using the value of i as the id, could use nanoid() to generate a unique id
            const dieObj = {id: i, selected: false, value: randNum}
            // console.log("dieObj:", dieObj)
            diceArray.push(dieObj)
        }    
        // alternative way of doing the same thing as the for loop method above:
        // return new Array(numDice)
        // .fill(0)
        // .map(()=> Math.ceil(Math.random() * 6)) 

        // console.log("Roll All New Dice array length ", diceArray[3])

        return diceArray
    }    
    
    function handleClickRollAllDice() {
        // console.log("rolling All dice")
        setDice(generateAllNewdice())
        if (win === true) {
            // set focus to the first button
            const element = document.getElementById(0);
            if (element) element.focus();

            setNumRolls(1)
            setNumDiceRolled(numDice)
            setWin(false)
        } 
        else {
            setNumRolls(prevNumRolls => prevNumRolls + 1)
            setNumDiceRolled(prevNumDiceRolled => prevNumDiceRolled + numDice)
        }

    }    

    function handleClickRollDice() {
        // console.log("rolling dice")
        setDice(prevDiceArray => 
            prevDiceArray.map(die =>
                die.selected === false
                ? { ...die, value: Math.ceil(Math.random() * 6) }
                : die
            )
        );

        const unselectedCount = dice.filter(die => !die.selected).length;
        setNumRolls(prevNumRolls => prevNumRolls + 1)
        setNumDiceRolled(prevNumDiceRolled => prevNumDiceRolled + unselectedCount)
    }    

    function handleClickSingleDie(id) {
        console.log("rolling die", id)
    
        setDice(prevDiceArray =>
            prevDiceArray.map(die =>
              die.id === id
                ? { ...die, value: Math.ceil(Math.random() * 6) }
                : die
            )
          );
          setNumRolls(prevNumRolls => prevNumRolls + 1)
          setNumDiceRolled(prevNumDiceRolled => prevNumDiceRolled + 1)
    }

    function handleRightClickSingleDie(id) {
        // console.log("saving die", id)

        // when using the callback function with multiple lines use the {} and a return statement
        setDice(prevDiceArray => {
            return prevDiceArray.map(die => {
              return die.id === id
                ? { ...die, selected: !die.selected }
                : die
            })
        });
    }

    function checkForWin() {
        const bReturn = dice.every(die => die.value === dice[0].value)
        setWin(bReturn)
        return bReturn
    }

    return (
        <>
            <main>
                {win && <Confetti />}
                <div aria-live="polite" className="sr-only" aria-atomic="true">
                    {win && <p>You win! Press New Game to start again</p>}
                </div>
                <h1 className="main-heading">Tenzies</h1>
                <div>
                <p className="instructions">Roll until all dice are the same.</p>
                <p className="instructions">Click each die to roll just that die.</p>
                <p className="instructions">Right click each die to save it at its current value </p>
                </div>
                <div className="dice-container">
                    {diceElements}
                </div>
                <div className="stats-container">
                    <div className="stats-pair">
                        <span>Number of Rolls:</span>
                        <span>{numRolls}</span>
                    </div>
                    <div className="stats-pair">
                        <span>Number of Dice Rolled:</span>
                        <span>{numDiceRolled}</span>
                    </div>
                </div>
                <button 
                    className="roll-all-dice" 
                    id="newGameId" 
                    ref={buttonRef}
                    onClick={handleClickRollAllDice}
                >
                    {win ? "New Game" : "Roll All Dice"} 
                </button>
                <button className={win ? "roll-all-dice buttonDisabled": "roll-all-dice"} onClick={handleClickRollDice}>Roll Dice</button>
                <span className={win ? "win-result-true" : "win-result-false"}>{win ? "You Win!" : "You lose"}</span>
            </main>
        </>
    )
}

export default Main
