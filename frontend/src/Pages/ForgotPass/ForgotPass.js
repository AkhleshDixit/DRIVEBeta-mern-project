import React, { useState,useEffect } from 'react'
import {useHistory} from 'react-router-dom';
import { Popup } from '../../Components/Popup/Popup';
import Styles from './ForgotPass.module.css';

export const ForgotPass = () => {

    let history = useHistory();

    const [email, setEmail] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // if(sessionStorage.getItem('email')){
        //     history.push('/user/dashboard');
        // }
        if(localStorage.getItem('id')){
            history.push('/user/dashboard');
        }
        // if(localStorage.getItem('email')){
        //     history.push('/user/dashboard');
        // }
    }, [history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { email };
        fetch('/account/forgotpassword', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {

                if (result.success) {
                    setMessage(result.message);
                    setShowPopup(!showPopup);
                    setEmail('');
                }
                else {
                    setMessage(result.message);
                    setShowPopup(!showPopup);
                }
            })
    }
    return (
        <div className={Styles.forgotpass}>
            <div className={Styles.container}>
                <h1>Submit Email</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="email" />
                    <input type="submit" value="SUBMIT" />
                </form>
                <Popup trigger={showPopup} setTrigger={setShowPopup} content={message} />
            </div>
        </div>
    )
}
