import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase'

// sudo npm install -g firebase-tools
// npm i firebase
import './Login.css'

const Login = () => {

    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault()

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(error => console.log(error.message))
    }

    const registerUser = (e) => {
        e.preventDefault()

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully create a new user with email and password
                // console.log(auth)
                history.push('/')
            })
            .catch(error => console.error(error.message))
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo amazon-logo amazon-logo-base" alt=""/>
            </Link>

            <div className="login__container">
                <h1>Sign-in</h1>
                <form action="" onSubmit={signIn}>
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <button type="submit" className="login__signInButton">Sign In</button>
                </form>

                <p>
                    By signing-in you agree to AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Nocice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button className="login__registerButton" onClick={registerUser} >Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
