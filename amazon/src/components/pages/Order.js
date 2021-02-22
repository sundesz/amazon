import React from 'react'
import moment from 'moment'

import CheckoutProduct from './components/CheckoutProduct'
import './Order.css'
import CurrencyFormat from 'react-currency-format'

const Order = ({order}) => {
    return (
        <div className="order">
            <p>{moment.unix(order.data.created).format('MMMM DO YYYY, h:mma')}</p>

            <p className="order__id">
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map(item => (
                <CheckoutProduct key={item.id}
                    id= {item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    quantity={item.quantity}
                    hideButton
                />
            ))}

            <CurrencyFormat
                renderText={(value) => (
                  <h3 className="order__total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={ order.data.amount / 100 }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"€"}
            />
        </div>
    )
}

export default Order
