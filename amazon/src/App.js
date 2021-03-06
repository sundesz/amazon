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


import Payment from './components/pages/Payment';

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './components/pages/Orders';
import axios from 'axios'
import ProductDetail from './components/pages/ProductDetail';


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

    axios.get('https://ipapi.co/json/').then(response => {
      dispatch({
        type: 'SET_COUNTRY',
        country: response.data.country_name,
      })
    }).catch(error => {
      console.log(error)
    })


    axios.get('https://fakestoreapi.com/products?limit=6').then(response => {
      dispatch({
        type: 'LOAD_PRODUCTS',
        products: response.data
      })
    }).catch(error => {
      console.log(error)
    })

  }, [])



  return (
    <Router>
      <div className="App">

        <Switch>

          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>

          <Router path ="/payment">
            <Header/>
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            <Footer />
          </Router>

          <Route path="/product/:productId">
            <Header />
            <ProductDetail />
            <Footer />
          </Route>

          <Route path="/" exact>
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