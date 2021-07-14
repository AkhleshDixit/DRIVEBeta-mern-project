import React, { useState } from 'react'
import './Popup.css'

export const ProfilePopup = ({ trigger, setTrigger, setShowPopup, setMessage }) => {

    const [file, setFile] = useState(null);
    const id = localStorage.getItem('id');
    const handleUploadBtn = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', file);
        fetch(`/user/updateprofile/${id}`, {
            method: "PUT",
            body: formData
        }).then(resp => {
            resp.json().then((result) => {
                if (result.success) {
                    setShowPopup(true);
                    setMessage(result.message);
                }
                else {
                    setShowPopup(true);
                    setMessage(result.message);
                }
            })
        })
        setTrigger(false);
    }
    return (
        (trigger) ? (
            <div className="popup">
                <div className="inner-popup">
                    <button className="close-btn" onClick={() => setTrigger(false)}>Close</button>
                    <form onSubmit={handleUploadBtn}>
                        <input type="file" name="avatar" onChange={(e) => { setFile(e.target.files[0]) }} required />
                        <input type="submit" value="Upload" className="upload-btn" />
                    </form>
                </div>
            </div>) : null
    )
}
