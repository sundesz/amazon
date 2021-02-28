import React from 'react'
import PropTypes from 'prop-types'
import './Product.css'
import { useStateValue } from '../StateProvider'
import CurrencyFormat from 'react-currency-format'
import {Link} from 'react-router-dom'
import Rating from './pages/components/Rating'

const Product = ({id, title, image, price, rating, quantity}) => {

    const [{basket}, dispatch] = useStateValue()

    // console.log('this is the basket >>>', basket)

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
                quantity: quantity,
            }
        })
    }


    return (
        <div className="product">
            <Link to={`/product/${id}`}>
                <div className="product__info">
                    <p>{title}</p>
                    <p className="product__price">

                    <CurrencyFormat
                        renderText={(value) => (
                            <strong>{value}</strong>
                        )}
                        decimalScale={2}
                        value={ price }
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"€"}
                    />

                    </p>

                    <div className="product__rating">
                        <Rating rating={rating} />
                    </div>
                </div>

                <img
                    src={image}
                    alt=""
                />
            </Link>
            <button type="button" onClick={addToBasket} style={{cursor: 'pointer'}} >Add to Basket</button>
        </div>
    )
}


Product.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,

}

export default Product