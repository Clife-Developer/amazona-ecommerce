import React, {useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../actions/userAction';
import {Link} from 'react-router-dom';
import axios from 'axios';
    
function UserList(props) {
    const dispatch=useDispatch();
    const productList=useSelector(state=>state.userListDetails)
    const {loading,error,userList}=productList;
    
    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])
    const removeUser=async(id)=>{
          const {data}=await axios.delete(`/api/users/${id}`)
    }
    return (
        <>
        <div className="row center">
            <h1 className="headings">LIST OF USERS</h1>
        </div>
         <div className="row top">
            <div className="col-2">
            
                { loading? (<LoadingBox></LoadingBox>):error?(<MessageBox></MessageBox>): (
                    <ul>
                        {userList && userList.map(user=>
                        {
                            return(<li key={user._id}>
                                <div className="row">
                                    <div>
                                         ID: {user._id}
                                     </div>
                                      <div>
                                         {user.name}
                                     </div>
                                     <div className="min-30">
                                        {user.email}
                                     </div>
                                     <div>
                                        <form action="">
                                             <button className="cart" type="submit" onClick={(e)=>removeUser(user._id)}>Delete User</button>
                                        </form>
                                     </div>
                                     
                                </div>
                            </li>)
                         })
                       }
                    </ul>
                )}
            </div>
        </div>
        </>
    )
}


export default UserList