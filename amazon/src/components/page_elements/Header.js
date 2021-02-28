import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import FlagIcon from '@material-ui/icons/Flag';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import { auth } from '../../firebase'
import { getUserName, getBasekTotalItem, getBasketTotal } from '../../reducer';
import { Badge, Drawer, Tooltip } from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  paper: {
    padding: '5px 20px'
  }
});

const Header = () => {

    const styles = useStyles();
    const [{ basket, user, country, openCart }, dispatch] = useStateValue()

    const handleAuthentication = () => {
        auth.signOut()
    }

    return (

        <div className='nav'>
            <div className="nav__left">

                <Link to="/">
                    <span className="nav__logo amazon-sprite amazon-logo-base" ></span>
                </Link>

                <div className="nav__location">

                    <LocationOnIcon className="nav__icon" />

                    <div className="nav__option">
                        <div className="nav__optionLineOne">
                            Deliver to {user ? getUserName(user.email) : ''}
                        </div>
                        <div className="nav__optionLineTwo">
                            {country}
                        </div>
                    </div>
                </div>
            </div>

            <div className="nav__search">
                <input type="text" className="nav__searchInput" />
                <SearchIcon className="nav__searchIcon" />
            </div>

            <div className="nav__right">

                <div className="nav__language">
                    <FlagIcon className="nav__flag" />
                </div>
                <Link to="/login">
                {/* <Link to={!user && "/login"}> */}
                    <div onClick={handleAuthentication} className="nav__option">
                        <span className="nav__optionLineOne">
                            Hello {user ? getUserName(user.email) : 'Guest'}
                        </span>
                        <span className="nav__optionLineTwo">
                            {user ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>

                <Link to="/orders">
                    <div className="nav__option">
                        <span className="nav__optionLineOne">
                            Reutrns
                        </span>
                        <span className="nav__optionLineTwo">
                            & Orders
                        </span>
                    </div>
                </Link>


                <Link to="/checkout">
                    <div className="nav__optionBasket">

                        <span className="nav__basketCount">{getBasekTotalItem(basket)}</span>
                        <span className="amazon-sprite amazon-cart-icon" ></span>

                        <div className="nav__option">
                            <span className="nav__optionLineOne">
                                Shopping-
                            </span>
                            <span className="nav__optionLineTwo">
                                Basket
                            </span>
                        </div>

                    </div>
                </Link>
            </div>

            <Drawer classes={{ paper: styles.paper }} anchor="right" open={openCart} onClose={() => dispatch({type: 'CLOSE_CART'})}>
                <CurrencyFormat
                    renderText={(value) => (
                        <small style={{margin: '10px 0 30px 0', textAlign: 'center'}}>
                            <p>
                                Subtotal
                            </p>
                            <strong style={{color:"#b1270b"}}>{value}</strong>
                        </small>
                    )}
                    decimalScale={2}
                    value={ getBasketTotal(basket) }
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"€"}
                />

                {basket.map(basketItem => (
                    <div key={basketItem.id} style={{display: 'flex', marginBottom: '20px'}}>
                        <Badge color="secondary" badgeContent={basketItem.quantity}></Badge>
                        <Link to={`/product/${basketItem.id}`}>
                            <Tooltip title="View Related item" placement="left" arrow>
                                <img key={basketItem.id} src={basketItem.image} className="cart__image" alt="" />
                            </Tooltip>
                        </Link>
                    </div>
                ))}
            </Drawer>
        </div>
    )
}

export default Header
