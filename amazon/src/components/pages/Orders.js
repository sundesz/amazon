import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../StateProvider'
import { db } from '../../firebase'
import './Orders.css'
import Order from './Order'

const Orders = () => {

    const [{basket, user}, dispatch] = useStateValue()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (user) {
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        } else {
            setOrders([])
        }


    }, [user])


    return (
        <div className="orders">
            <h1>Your Orders</h1>

            <div className="orders__order">
                {user ?
                orders?.map((order, i) => (
                    <Order key={i} order={order} />
                )):
                <h5>Please sign in to see your orders</h5>
                }
            </div>
        </div>
    )
}

export default Orders
