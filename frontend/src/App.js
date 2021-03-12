import React from 'react'
import ProductScreen from './screens/ProductScreen'
import HomeScreen from './screens/HomeScreen'
import {BrowserRouter, Route} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
      {/* Header */}
        <header className="row">
            <div><a  className="brand" href="/">Amazona</a></div>
            <div>
                <a href="/cart">Cart</a>
                <a href="/singin">Sign In</a>
            </div>
        </header>
        <main>
          {/* application routes */}
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
