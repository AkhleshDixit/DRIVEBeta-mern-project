import React, { useState,useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Popup } from '../../Components/Popup/Popup';
import style from './Signin.module.css';

export const Signin = () => {

    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        let data = { email, password };
        fetch('/account/login',
            {
                method: "POST",
                headers: { "Accept": "application/json", "content-type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {

                if (result.success) {
                    // sessionStorage.setItem('email',email);
                    // localStorage.setItem('email',email);
                    localStorage.setItem('id',result.id);
                    history.push('/user/dashboard');
                }
                else {
                    setMessage(result.message);
                    setShowPopup(!showPopup);
                }
            });
    }

    return (
        <div className={style.signin}>
            <div className={style.signincontainer}>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={email} placeholder="email" onChange={(e) => { setEmail(e.target.value) }} required />
                    <input type="password" name="password" value={password} placeholder="password" onChange={(e) => { setPassword(e.target.value) }} required />
                    <input type="submit" value="SIGN IN" />
                    <Link to="/account/forgotpass">Forgot password ?</Link>
                </form>
                <Popup trigger={showPopup} setTrigger={setShowPopup} content={message} />
            </div>
        </div>
    )
}
