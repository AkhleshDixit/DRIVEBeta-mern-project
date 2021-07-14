import React, { useState,useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { Popup } from '../../Components/Popup/Popup';
import styles from './Register.module.css';
// import axios from 'axios';

export const Register = () => {

    let history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        // if(sessionStorage.getItem('email')){
        //     history.push('/user/dashboard');
        // }
        if(localStorage.getItem('id')){
            history.push('/user/dashboard');
        }
    }, [history]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('avatar',avatar);

        // axios.post('http://localhost:4000/signup',formData,{headers:{'content-type':'multipart/form-data'}}).then((res)=>{
        //     console.log('image uploaded successfully');
        // }).catch((err)=>{
        //     console.log('err',err);
        // });
        
        fetch('/account/signup', {
            method: "POST",
            body: formData
        })
            .then(result => result.json())
            .then((res) => {

                if (res.success) {
                    setMessage(res.message);
                    setShowPopup(!showPopup);
                    setName('');
                    setEmail('');
                    setPassword('');
                }
                else {
                    setMessage(res.message);
                    setShowPopup(!showPopup);
                }
            });

    }
    return (
        <div className={styles.signup}>
            <div className={styles.signupcontainer}>
                <h1>Register</h1>
                <form onSubmit={handleSubmit} >
                    <input type="text" name="name" value={name} placeholder="Enter full name" onChange={(e) => { setName(e.target.value) }} required />
                    <input type="email" name="email" value={email} placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} required />
                    <input type="password" name="password" value={password} placeholder="Enter password" onChange={(e) => { setPassword(e.target.value) }} required />
                    <input type="file" name="avatar" onChange={(e)=>setAvatar(e.target.files[0])} />
                    <input type="submit" value="SIGN UP" />
                </form>
                <Popup trigger={showPopup} setTrigger={setShowPopup} content={message} />
            </div>
        </div>
    )
}
