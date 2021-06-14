import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { Signout } from './actions/userAction';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddress from './screens/ShippingAddress';
import PaymentMethod from './screens/PaymentMethod';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductsList from './screens/ProductList';
import UserList from './screens/userList'
import AddingProducts from './screens/AddingProducts';
import Paid from './screens/Paid';
import OrderList from './screens/OrderList';
import UpdateProduct from './screens/UpdateProduct';
import Page404 from './screens/Page404';
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
            <div><Link  className="brand" to="/">CLIFE'S STORE</Link></div>
            <div>
                <Link to="/cart">Cart
                {cartItems.length >0 &&(
                  <span className="badge">{cartItems.length}</span>
                )}</Link>
                {userInfo? 
                (
                <div className="dropdown">
                  <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i>{' '}</Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderHistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="/" onClick={signoutHandler}>Sign Out</Link>
                    </li>
                  </ul>
                </div>):
                   (<Link to="/signin">Sign In</Link>)}
                   {userInfo && userInfo.isAdmin && (<div className="dropdown">
                     <Link to="#admin">Admin {" "}<i className="fa fa-caret-down"></i></Link>
                     <ul className="dropdown-content">
                       <li>
                         <Link to="/dashboard">Dashboard</Link>
                       </li>
                        <li>
                         <Link to="/productslist">Products</Link>
                       </li>
                        <li>
                         <Link to="/orders/orderslist">Orders</Link>
                       </li>
                        <li>
                         <Link to="/userList">Users</Link>
                       </li>
                     </ul>
                   </div>)}
            </div>
        </header>
        <main>
          {/* Pubblic rooutes */}
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/signin" component={SigninScreen} exact></Route>
          <Route path="/register" component={RegisterScreen} exact></Route>
          <Route path="/placeorder" component={PlaceOrderScreen} exact></Route>

          {/* Private rooutes */}
          <PrivateRoute path="/shipping" component={ShippingAddress} exact></PrivateRoute>
          <PrivateRoute path="/payment" component={PaymentMethod} exact></PrivateRoute>
          {/* <Route path="/" component={OrderScreen} exact></Route> */}
          <PrivateRoute path="/orderHistory" component={OrderHistoryScreen} exact></PrivateRoute>
          <PrivateRoute path="/profile" component={ProfileScreen} exact></PrivateRoute>
          <PrivateRoute path="/order/:id" component={OrderScreen} exact></PrivateRoute>
          <PrivateRoute path="/pay/:id" component={Paid} exact></PrivateRoute>

          {/* Admin rooutes */}
          <AdminRoute path="/productslist" component={ProductsList} exact></AdminRoute>
          <AdminRoute path="/userList" component={UserList} exact></AdminRoute>
          <AdminRoute path="/orders/orderslist" component={OrderList} exact></AdminRoute>
          <AdminRoute path="/addproducts" component={AddingProducts} exact></AdminRoute>
          <AdminRoute path="/updateProduct/:id" component={UpdateProduct} exact></AdminRoute>
        
          {/*Home page route*/}
           <Route path="/" component={HomeScreen} exact></Route>
        </main>
        {/* Footer */}
        <footer className="row center">All rights reserved</footer>
    </div>
    </BrowserRouter>
  )
}

export default App;
