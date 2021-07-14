import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Popup } from '../Popup/Popup';
import { ProfilePopup } from '../Popup/ProfilePopup';
import dash from './Dashboard.module.css';

export const Dashboard = () => {
    let history = useHistory();

    const [name, setName] = useState('');
    const [profilePicPath, setProfilePicPath] = useState('');
    const [file, setFile] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [message, setMessage] = useState('');

    const handleProfileClick = () => {
        setShowProfilePopup(true);
    }

    const handleClick = () => {
        // sessionStorage.removeItem('email');
        localStorage.removeItem('id');
        history.push('/');
    }
    const id = localStorage.getItem('id');

    const submitFile = (e) => {
        e.preventDefault();
        const fileData = new FormData();
        fileData.append('pdf', file);
        fileData.append('userId', id);

        fetch(`/user/files`, {
            method: "POST",
            body: fileData,
        }).then(res => {
            res.json().then((result) => {
                setShowPopup(!showPopup);
                setMessage('File uploaded successfully');
            });
        });
    }

    useEffect(() => {
        fetch(`/user/${id}`).then(resp => {
            resp.json().then((result) => {

                if (result.success) {
                    setName(result.name);
                    setProfilePicPath(result.profilePicPath);
                }
            });
        });
    })

    let imgPath = profilePicPath;
    imgPath = 'http://192.168.43.179:4000/' + profilePicPath;
    // imgPath = 'https://drive-beta-akhlesh-dixit.herokuapp.com/' + profilePicPath;

    return (
        <>
            <div className={dash.dashboard}>
                <div className={dash.container}>
                    <div className={dash.logo}>
                        <h1>DRIVE<span>Beta</span></h1>
                    </div>
                    <div className={dash.leftside}>
                        <div className={dash.profilePicDiv}>
                            <img src={imgPath} alt="profile pic" onClick={handleProfileClick} />
                        </div>
                        <h1>{name}</h1>
                        <button onClick={handleClick}>Sign Out</button>
                    </div>
                </div>
                <div className={dash.userfiles}>
                    <div className={dash.filecont}>
                        <h1>Upload your files</h1>
                        <div className={dash.files}>
                            <form onSubmit={submitFile}>
                                <input type="file" name="pdf" onChange={(e) => { setFile(e.target.files[0]) }} required />
                                <button type="submit">Upload</button>
                            </form>
                        </div>
                        <button onClick={() => { history.push('/user/dashboard/files') }}>Show uploaded files</button>
                    </div>
                </div>
            </div>
            <Popup trigger={showPopup} content={message} setTrigger={setShowPopup} />
            <ProfilePopup trigger={showProfilePopup} setTrigger={setShowProfilePopup} setShowPopup={setShowPopup} setMessage={setMessage} />
        </>
    )
}
