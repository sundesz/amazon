import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import FlagIcon from '@material-ui/icons/Flag';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import { auth } from '../../firebase'
import { getUserName, getBasekTotalItem } from '../../reducer';


const Header = () => {

    const [{ basket, user }, dispatch] = useStateValue()

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
                            Location
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
        </div>
    )
}

export default Header
