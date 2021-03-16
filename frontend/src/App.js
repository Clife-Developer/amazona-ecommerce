import React from 'react';
import {useSelector} from 'react-redux';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
function App() {

  const cart=useSelector(state =>state.cart);
  const {cartItems}=cart;
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
                <Link to="/singin">Sign In</Link>
            </div>
        </header>
        <main>
          {/* application routes */}
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        {/* Footer */}
        <footer className="row center">All rights reserved</footer>
    </div>
    </BrowserRouter>
  )
}

export default App;
