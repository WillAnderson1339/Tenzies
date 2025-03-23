import React from 'react'

import '../css/Die.css'


function Die(props) {
    return (
        <>
            {/* <div className="die"> */}
                {/* <span className="dieText">{props.dieText}</span> */}
            {/* </div> */}
            <button className="die-button">{props.value}</button>
        </>
    )
}

export default Die
