import React from 'react'
import './Popup.css'

export const Popup = ({trigger,setTrigger,content}) => {
    return (
        (trigger) ? (
            <div className="popup">
                <div className="inner-popup">
                    <button className="close-btn" onClick={()=>setTrigger(false)}>Close</button>
                    {content}
                </div>
            </div>) : null
    )
}
