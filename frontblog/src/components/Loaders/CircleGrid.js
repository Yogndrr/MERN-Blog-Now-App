import React from 'react'
import "./CircleGrid.css"

const CircleGrid = () => {
    return (
        <div className="circle-grid-container">
            <div className="lds-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="below-lds-grid">
                Please Wait...
            </div>
        </div>
    )
}

export default CircleGrid