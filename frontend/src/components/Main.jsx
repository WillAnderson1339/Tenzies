import React from 'react'

import Die from './Die'

import '../css/Main.css'


function Main() {
    const [dice, setDice] = React.useState(generateAllNewdice())

    function generateAllNewdice() {
        const diceArray = []
        let randNum = 0;
        for (let i = 0; i < 10; i++) {
            randNum = Math.ceil(Math.random() * 6)
            diceArray.push(randNum)
        }
        // alternative way of doing the same thing as the for loop method above:
        // return new Array(10)
        // .fill(0)
        // .map(()=> Math.ceil(Math.random() * 6)) 

        // console.log("Roll All New Dice array length ", diceArray[3])

        return diceArray
    }
    
    function handleClickRollAllDice() {
        setDice(generateAllNewdice())
    }

    const diceElements = dice.map(num => <Die value={num} rollDie={rollSingleDie}/>)

    function rollSingleDie(id) {
        console.log("rolling die", id)
    }

    return (
        <>
            <main>
                <div className="dice-container">
                    {diceElements}
                </div>
                <button className="roll-all-dice" onClick={handleClickRollAllDice} >Roll All Dice</button>
                </main>
        </>
    )
}

export default Main
