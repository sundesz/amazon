import React from 'react'
import { useStateValue } from '../../../StateProvider'
import './CheckoutProduct.css'

const CheckoutProduct = ({ id, title, image, price, rating, quantity, hideButton }) => {

    const [{basket}, dispatch] = useStateValue()

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    const addToBasket = (qty) => {
        qty = parseInt(qty)
        dispatch({
            type: (qty === 0) ? 'REMOVE_FROM_BASKET' : 'ADD_TO_BASKET_FROM_CART',
            id: id,
            quantity: qty,
        })
    }

    return (
        <div className='checkoutProduct'>
            <img className="checkoutProduct__image" src={image} alt="" />

            <div className="checkoutProduct__detail">

                <div className="checkoutProduct__info">
                    <p className="checkoutProduct__title">{title}</p>
                    <div className="checkoutProduct__rating">
                        { Array(rating).fill().map((_, i) => <p key={i}>*</p>)}
                    </div>

                    <div className="checkoutProduct__operations">
                        {hideButton ? (<span>Qty: {quantity}</span>) : (
                            <>
                            <select name="" id="" onChange={(e) => addToBasket(e.target.value)} value={quantity}>
                                {Array.from({length: 10},(_,x) => (<option key={x} value={x}>{x === 0 ? `${x} (Delete)` : x}</option>))}
                            </select> &nbsp;| &nbsp;
                            <span className="remove" type="button" onClick={removeFromBasket} style={{cursor: 'pointer'}}>Remove from Basket</span>
                            </>
                        )}

                    </div>

                </div>

                <div className="checkoutProduct__price">
                    <small>€</small>
                    <strong>{price}</strong>
                </div>

            </div>
        </div>
    )
}

export default CheckoutProduct
