import Product from '../Product'
import './Home.css'
import axios from 'axios'
import { useStateValue } from '../../StateProvider'
import { useEffect } from 'react'

const Home = () => {
    const [{products}, dispatch] = useStateValue()

    return (
        <div className="home">
            <div className="home__container">
                <img
                    className="home__image"
                    src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg"
                    alt=""
                />


                <div className="home__row">
                    {products.slice(0, 2).map((p, i) => (
                        <Product
                            key = {p.id}
                            id = {p.id}
                            title = {p.title}
                            price = {p.price}
                            image = {p.image}
                            rating = {5}
                            quantity = {1}
                        />))
                    }
                </div>


                <div className="home__row">
                    {products.slice(2,5).map((p, i) => (
                        <Product
                            key = {p.id}
                            id = {p.id}
                            title = {p.title}
                            price = {p.price}
                            image = {p.image}
                            rating = {5}
                            quantity = {1}
                        />))
                    }

                </div>

                <div className="home__row">
                    {products.slice(5,6).map((p, i) => (
                        <Product
                            key = {p.id}
                            id = {p.id}
                            title = {p.title}
                            price = {p.price}
                            image = {p.image}
                            rating = {5}
                            quantity = {1}
                        />))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
