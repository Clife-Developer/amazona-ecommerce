import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import { Signin } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SigninScreen(props) {

    const [email, setEmail]=useState('');
    const [password,setPassword]=useState();

    const redirect=props.location.search? props.location.search.split('=')[1]:'/';

    const userSignin=useSelector((state)=>state.userSignin);
    const {userInfo,loading,error}=userSignin;

    const dispatch=useDispatch();
    const SubmitHandler=(e)=>{
        e.preventDefault();
        dispatch(Signin(email,password))
    };

    useEffect(()=>{
        if(userInfo){
            //redirecting user to "direct"
            props.history.push(redirect);
        }
    },[userInfo,redirect,props.history])
    return (
        <div>
            <form className="form" onSubmit={SubmitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" id="email" 
                    placeholder="Enter email address" required onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" 
                    placeholder="Enter password" required onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <div>
                        New Customer? <Link to="/register">Create new account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SigninScreen
