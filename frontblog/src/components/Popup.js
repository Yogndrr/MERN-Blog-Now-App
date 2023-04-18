import React from 'react'

const Popup = ({ message, setShowPopup }) => {
    return (
        <>
            <div className="msg-popups">
                <div className="msg-popups-content">
                    <h2>{message}</h2>
                    <div className="msg-popup-buttons">
                        <button className="msg-popup-ok-button msg-popupButton" onClick={() => setShowPopup(false)}>Ok</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup