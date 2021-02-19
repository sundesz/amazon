
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/page_elements/Header'
import Footer from './components/page_elements/Footer'
import Home from './components/pages/Home';
import Checkout from './components/pages/Checkout';
import Login from './components/pages/Login';
import { auth } from './firebase'
import { useStateValue } from './StateProvider';
import NavbarSecond from './components/page_elements/NavbarSecond';

import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import Payment from './components/pages/Payment';

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './components/pages/Orders';


const promise = loadStripe('pk_test_51IMA7hF5c4R7e5PYlI3QqvAsai8z3VmG8VbX5bMqFQcKsPwX7VhIg6aRWOYqr4bKnRIwnKQv2JlI2DZOLd4VVp3t00Vbh2aAHx')

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

          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Router path ="/payment">
            <Header/>
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Router>

          <Route path="/">
            <Header />
            <NavbarSecond />
            <Home />
            <Footer />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;