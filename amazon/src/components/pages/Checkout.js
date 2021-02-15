import { useStateValue } from '../../StateProvider'
import './Checkout.css'
import CheckoutProduct from './components/CheckoutProduct'
import Subtotal from './components/Subtotal'
import FlipMove from 'react-flip-move'


const Checkout = () => {

    const [{ basket, user }, dispatch] = useStateValue()


    return (
        <div className="checkout">
            <div className="checkout__left">
                <div className="checkout__products">
                    <h2 className="checkout__title">
                        <span style={{display: 'block'}}>{user ? `Hello ${user?.email},` : ''}</span>
                        Shopping Basket
                    </h2>

                {basket.map((item, index) => (
                    <CheckoutProduct
                        key={index}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}

                </div>
            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
