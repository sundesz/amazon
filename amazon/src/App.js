
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/page_elements/Header'
import Home from './components/pages/Home';
import Checkout from './components/pages/Checkout';
import Login from './components/pages/Login';
import { auth } from './firebase'
import { useStateValue } from './StateProvider';


function App() {

  const [{user}, dispatch] = useStateValue()


  useEffect(() => {

    auth.onAuthStateChanged(authUser => {
      dispatch({
        type: 'SET_USER',
        user: authUser ? authUser : null
      })
    })
  }, [])

  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/" exact>
            <Header />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;