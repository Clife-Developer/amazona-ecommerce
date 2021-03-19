
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import { register } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function RegisterScreen(props) {

    const [email, setEmail]=useState('');
    const [password,setPassword]=useState();
    const [name,setName]=useState('');
    const [ConfirmPassword,setConfirmpassword]=useState('');

    const redirect=props.location.search? props.location.search.split('=')[1]:'/';

    const userRegister=useSelector((state)=>state.userRegister);
    const {userInfo,loading,error}=userRegister;

    const dispatch=useDispatch();
    const SubmitHandler=(e)=>{
        e.preventDefault();
        if(password !==ConfirmPassword){
            alert("password and Comfirm password do not match")
        }else{
           dispatch(register(name, email, password))
        }
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
                    <h1>Register</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" 
                    placeholder="Enter Name" required onChange={(e)=>setName(e.target.value)}/>
                </div>
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
                    <label htmlFor="Confirmpassword">Confirm Password</label>
                    <input type="password" name="Confirmpassword" id="Confirmpassword" 
                    placeholder="Confirm Password" required onChange={(e)=>setConfirmpassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <div>
                        already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen
