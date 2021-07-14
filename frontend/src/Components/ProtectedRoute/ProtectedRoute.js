import React,{useEffect} from 'react'
import {Route,useHistory} from 'react-router-dom';

export const ProtectedRoute = ({Cmp}) => {
    let history = useHistory();
    useEffect(()=>{
        // if(!sessionStorage.getItem('email')){
        //     history.push('/');
        // }
        if(!localStorage.getItem('id')){
            history.push('/');
        }
        // if(!localStorage.getItem('email')){
        //     history.push('/');
        // }
    },[history])
    return (
        <Route><Cmp /></Route>
    )
}
