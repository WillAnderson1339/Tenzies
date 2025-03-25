import React from 'react'

import '../css/Die.css'


function Die(props) {
    return (
        <>
            <button 
                className={props.selected ? "die-button die-button-selected" : "die-button die-button-not-selected"} 
                id={props.id}
                onClick={() => props.rollDie(props.id)}
                onContextMenu={(event) => { 
                    event.preventDefault();
                    props.saveDie(props.id);
                }}
                aria-pressed={props.selected}
                aria-label={`Die with value ${props.value},${props.selected ? " selected" : " not selected"}`}>
            {props.value}
            </button>
        </>
    )
}

export default Die
