import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { Signout } from './actions/userAction';
import RegisterScreen from './screens/RegisterScreen';
function App() {

  const cart=useSelector(state =>state.cart);
  const userSignin=useSelector(state=>state.userSignin)
  const dispatch=useDispatch()
  const {cartItems}=cart;
  const {userInfo}=userSignin;
  
  const signoutHandler=()=>{
    dispatch(Signout())
    console.log(userInfo)
  }
  return (
    <BrowserRouter>
    <div className="grid-container">
      {/* Header */}
        <header className="row">
            <div><Link  className="brand" to="/">Amazona</Link></div>
            <div>
                <Link to="/cart">Cart
                {cartItems.length >0 &&(
                  <span className="badge">{cartItems.length}</span>
                )}</Link>
                {userInfo? 
                (
                <div className="dropdown">
                  <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <Link to="/signout" onClick={signoutHandler}>Sign Out</Link>
                  </ul>
                </div>):
                   (<Link to="/signin">Sign In</Link>)}
            </div>
        </header>
        <main>
          {/* application routes */}
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/signin" component={SigninScreen} exact></Route>
          <Route path="/register" component={RegisterScreen} exact></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        {/* Footer */}
        <footer className="row center">All rights reserved</footer>
    </div>
    </BrowserRouter>
  )
}

export default App;
