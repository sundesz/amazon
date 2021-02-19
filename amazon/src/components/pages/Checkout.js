import { useStateValue } from '../../StateProvider'
import './Checkout.css'
import CheckoutProduct from './components/CheckoutProduct'
import Subtotal from './components/Subtotal'
import { getBasekTotalItem, getBasketTotal } from '../../reducer'
import CurrencyFormat from 'react-currency-format'


const Checkout = () => {

    const [{ basket, user }, dispatch] = useStateValue()


    return (
        <div className="checkout">
            <div className="checkout__left">
                <h2 className="checkout__title">
                    <span style={{display: 'block'}}>{user ? `Hello ${user?.email},` : ''}</span>
                    Shopping Basket
                </h2>

                <div className="checkout__products">
                    {basket.map((item, index) => (
                        <CheckoutProduct
                            key={index}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            quantity={item.quantity}
                            rating={item.rating}
                        />
                    ))}
                </div>

                <div className="checkout__total">
                    <CurrencyFormat
                        renderText={(value) => (
                            <p>
                                Subtotal ({ getBasekTotalItem(basket) } items): <strong>{value}</strong>
                            </p>
                        )}
                        decimalScale={2}
                        value={ getBasketTotal(basket) }
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"€"}
                    />

                </div>
            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
