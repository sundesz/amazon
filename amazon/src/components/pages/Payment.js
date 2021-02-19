import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CurrencyFormat from 'react-currency-format'
import { Link, useHistory } from 'react-router-dom'
import { getBasekTotalItem, getBasketTotal } from '../../reducer'
import { useStateValue } from '../../StateProvider'
import CheckoutProduct from './components/CheckoutProduct'

import { db } from '../../firebase'
import './Payment.css'


const Payment = () => {

    const [{basket, user}, dispatch] = useStateValue()

    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [processing, setProcessing] = useState('')
    const [succeeded, setSucceeded] = useState(false)

    const [clientSecret, setClientSecret] = useState(true)

    const stripe = useStripe()
    const elements = useElements()

    const history = useHistory()

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })

            setClientSecret(response.data.clientSecret)
        }

        getClientSecret()
    }, [basket])


    clientSecret === true && console.warn('Client secret is true')
    // console.log("Stripe ClientSecret >>>", clientSecret)
    // console.log("user >>>", user)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
    }

    const handleChange = e => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details

        setDisabled(e.empty)
        setError(e.error ? e.error.message: '')
    }

    return (
      <div className="payment">
          <div className="payment__container">

            <h1>
                Checkout(
                    <Link to="/checkout">{getBasekTotalItem(basket)}</Link> items
                )
            </h1>


              {/* Payment section - Delivery address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Kivisto</p>
                        <p>01700, Vantaa</p>
                    </div>
                </div>

              {/* Payment section - Review Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        { basket.map(basketItem => (
                            <CheckoutProduct
                                key={basketItem.id}
                                id={basketItem.id}
                                title =  {basketItem.title}
                                image={basketItem.image}
                                price={basketItem.price}
                                rating={basketItem.rating}
                                quantity={basketItem.quantity}
                            />
                        ))}
                    </div>
                </div>

              {/* Payment section - Payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form action="" onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={ getBasketTotal(basket) }
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"€"}
                                />

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now' }</span>
                                </button>
                            </div>

                            {/* Errors */}
                            { error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
          </div>
      </div>
    )
}

export default Payment
