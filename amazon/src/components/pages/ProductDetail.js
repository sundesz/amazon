import './ProductDetail.css'
import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useStateValue } from '../../StateProvider'
import Rating from './components/Rating'
import CurrencyFormat from 'react-currency-format'
import axios from 'axios'



const ProductDetail = () => {

    // const [product, setProduct] = useState()
    const {productId} = useParams()
    const [{product}, dispatch] = useStateValue()

    useEffect(() => {

        // document.body.style.backgroundColor = "#FFF"
        axios.get(`https://fakestoreapi.com/products/${productId}`).then(response => {

            dispatch({
                type: 'LOAD_PRODUCT',
                product: { ...response.data, quantity: 1, rating: 5}
            })
        }).catch(error => {
            console.log(error)
        })

    }, [])

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {...product, quantity: 1}
        })
    }


    return (
        <div className="productdetail">
            <style>{'body { background-color: #fff; }'}</style>
            <div className="productdetail__image">
                <img src={product?.image} alt="" />
            </div>
            <div className="productdetail__info">
                <h3 className="productdetail__title">{product?.title}</h3>
                <div className="productdetail__category">
                    Category: {product?.category}
                </div>
                <div className="productdetail__rating">
                    <Rating rating={product?.rating} />
                </div>
                <div className="productdetail__description">
                    {product?.description}
                </div>

                <hr />

                <div className="productdetail__price">
                    <CurrencyFormat
                        renderText={(value) => (
                            <>
                                <small>Price:</small>&nbsp;
                                <strong style={{color: '#b1270b'}}>{value}</strong>
                            </>
                        )}
                        decimalScale={2}
                        value={ product?.price }
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"€"}
                    />
                </div>
            </div>
            <div className="productdetail__cart">
                <div className="productdetail__price">
                    <CurrencyFormat
                        renderText={(value) => (
                            <strong>{value}</strong>
                        )}
                        decimalScale={2}
                        value={ product?.price }
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"€"}
                    />
                </div>
                <button type="button" onClick={addToBasket} style={{cursor: 'pointer'}} >Add to Basket</button>
            </div>
        </div>
    )
}


export default ProductDetail