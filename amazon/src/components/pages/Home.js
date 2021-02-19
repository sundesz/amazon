import Product from '../Product'
import './Home.css'

const Home = () => {
    return (
        <div className="home">
            <div className="home__container">
                <img
                    className="home__image"
                    src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg"
                    alt=""
                />

                <div className="home__row">
                    <Product
                        id="12345"
                        title="The lean startup"
                        price={29.99}
                        image="https://images-na.ssl-images-amazon.com/images/I/51I3UjD-Q1L.jpg"
                        rating={5}
                        quantity={1}
                    />
                    <Product
                        id="12346"
                        title="Boston 3-in-1 Combi-Pram Pram Baby Car Seat Buggy Carlo Complete Set"
                        price={319.99}
                        image="https://m.media-amazon.com/images/I/61pYrTWbXsL._AC_UL320_.jpg"
                        rating={4}
                        quantity={1}
                    />
                </div>

                <div className="home__row">
                    <Product
                        id="12347"
                        title="Combi pram 2-in-1 Bambimo with aluminium frame in many different colours – click system – all 4 wheels to remove – with extra large shopping basket – 2 in 1 sports seat – baby bath space saving  xl"
                        price={300}
                        image="https://m.media-amazon.com/images/I/71Us3Pn3zuL._AC_UL320_.jpg"
                        rating={5}
                        quantity={1}
                    />
                    <Product
                        id="12348"
                        title="Daliya Bambimo 3-in-1 Pram, Giant 14-Piece Set with Baby Seat in Various Colours Including Changing Bag/Rain Cover/Table"
                        price={300}
                        image="https://m.media-amazon.com/images/I/81Nte0VhSNL._AC_UL320_.jpg"
                        rating={4}
                        quantity={1}
                    />
                    <Product
                        id="12349"
                        title="Samsung Galaxy S20 FE, Android smartphone without contract, 6.5 inch super MOLED display, 4500 mAh battery."
                        price={494}
                        image="https://m.media-amazon.com/images/I/41-8PfVvLxL._AC_SR400,600_.jpg"
                        rating={5}
                        quantity={1}
                    />
                </div>

                <div className="home__row">
                <Product
                    id="12351"
                    title="Asus ROG Strix Gaming Monitor"
                    price={899}
                    image="https://m.media-amazon.com/images/I/81VktBgbSML._AC_UY218_.jpg"
                    rating={4}
                    quantity={1}
                />
                </div>
            </div>
        </div>
    )
}

export default Home
