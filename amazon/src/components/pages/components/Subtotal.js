import React from 'react'
import './Subtotal.css'
import { useHistory } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../../StateProvider'
import { getBasketTotal, getBasekTotalItem } from '../../../reducer'

// npm i react-currency-format

const Subtotal = () => {

    const history = useHistory()
    const [{ basket }, dispatch] = useStateValue()

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({ getBasekTotalItem(basket) } items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={ getBasketTotal(basket) }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"€"}
            />

            <button type="button" style={{cursor: 'pointer'}} onClick={e => history.push('/payment')}>Procced to Checkout</button>
        </div>
    )
}

export default Subtotal
