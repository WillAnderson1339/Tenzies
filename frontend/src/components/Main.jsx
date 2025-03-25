import React from 'react'

import Die from './Die'

import '../css/Main.css'

const numDice = 10

function Main() {
    const [dice, setDice] = React.useState(generateAllNewdice())
    const [win, setWin] = React.useState(false)

    const diceElements = dice.map(dieObj => 
    <Die 
        key={dieObj.id}
        id={dieObj.id} 
        selected={dieObj.selected}
        value={dieObj.randNum} 
        // NOTE: instead of passing the id as a prop so it can be used as a param when calling the onClick handler 
        // the id could be passed in the onClick hadler definition like this: onClick={() => handleClickSingleDie(dieObj.id)}
        rollDie={handleClickSingleDie}      
        saveDie={handleRightClickSingleDie}
    />)
    
    function generateAllNewdice() {
        const diceArray = []
        let randNum = 0;
        for (let i = 0; i < numDice; i++) {
            randNum = Math.ceil(Math.random() * 6)
            // NOTE: instead of using the value of i as the id, could use nanoid() to generate a unique id
            const dieObj = {id: i, selected: false, randNum: randNum}
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
        console.log("rolling All dice")
        setDice(generateAllNewdice())
        setWin(false)
    }    

    function handleClickRollDice() {
        console.log("rolling dice")
        setDice(prevDiceArray =>
            prevDiceArray.map(die =>
              die.selected === false
                ? { ...die, randNum: Math.ceil(Math.random() * 6) }
                : die
            )
          );
        checkForWin()
    }    

    function handleClickSingleDie(id) {
        // console.log("rolling die", id)
    
        setDice(prevDiceArray =>
            prevDiceArray.map(die =>
              die.id === id
                ? { ...die, randNum: Math.ceil(Math.random() * 6) }
                : die
            )
          );
        checkForWin()
    }

    function handleRightClickSingleDie(id) {
        console.log("saving die", id)

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
        console.log("*** Checking for win")
        let allMatch = false
        let thisMatch = false

        dice.map(die => {
            console.log("checking die.id:", die.id, "die.number:", die.randNum)
            thisMatch = checkDieValueForWin(die.randNum)
            if (thisMatch) {
                allMatch = true
            }
        })
        console.log ("current allMatch =", allMatch)
        if (allMatch) {
            console.log("All matched - You win!")
            setWin(true)
        }
        else {
            console.log("Did not match - You Lose!")
            setWin(false)
        }
        // let win = true;
        // for (let i = 0; i < dice.length; i++) {
        //     console.log("dice[i].randNum", i, dice[i].randNum)
        //     // if (dice[i].randNum !== 6) {
        //     if (dice[i].randNum > 5) {
        //         console.log("setting to false")
        //         win = false;
        //     }
        // }
        // if (win) {
        //     console.log("You Win!")
        //     setWin(true)
        // }
    }

    function checkDieValueForWin(value) {
        console.log("Checking for win value =", value)
        let same = false;
        for (let i = 0; i < dice.length; i++) {
            console.log("dice id=", i, "die=", dice[i].randNum, "value=", value)
            if (dice[i].randNum === value) {
                console.log("matched! setting to true")
                same = true;
            }
        }
        // if (win) {
            // console.log("You Win!")
            // setWin(true)
        // }
        return same
    }

    return (
        <>
            <main>
                <h1 className="main-heading">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to roll just that die. Right click each die to save it at its current value </p>
                <div className="dice-container">
                    {diceElements}
                </div>
                <button className="roll-all-dice" onClick={handleClickRollAllDice} >Roll All Dice</button>
                <button className="roll-all-dice" onClick={handleClickRollDice} >Roll Dice</button>
                <span className={win ? "win-result" : "win-foo"}>{win ? "You Win!" : "You lose"}</span>
            </main>
        </>
    )
}

export default Main
