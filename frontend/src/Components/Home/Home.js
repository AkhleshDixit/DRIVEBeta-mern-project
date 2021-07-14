import React,{useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import Style from './Home.module.css';

export const Home = () => {
    let history = useHistory();

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

    return (
        <div className={Style.home}>
            <div className={Style.homecontainer}>
                <h1>Welcome to DRIVE<span>Beta</span></h1>
                <Link to="/account/register">Register</Link>
                <Link to="/account/signin">Sign In</Link>
            </div>
        </div>
    )
}
