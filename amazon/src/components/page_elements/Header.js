import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const Header = () => {
    return (
        <div className='header'>
            <img className="header__logo amazon-logo amazon-logo-base" alt=""/>

            <div className="header__search">
                <input type="text" className="header__searchInput" />
                <SearchIcon className="header__searchIcon" />
            </div>

            <div className="header__nav">
                <div className="header__option">
                    <span class="header__optionLineOne">
                        Hello
                    </span>
                    <span class="header__optionLineTow">
                        Sign in
                    </span>
                </div>
                <div className="header__option">
                    <span class="header__optionLineOne">
                        Reutrns
                    </span>
                    <span class="header__optionLineTow">
                        & Orders
                    </span>
                </div>
                <div className="header__option">
                    <span class="header__optionLineOne">
                        Your
                    </span>
                    <span class="header__optionLineTow">
                        Prime
                    </span>
                </div>

                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__optionLineTwo header__basketCount">0</span>
                </div>
            </div>

        </div>
    )
}

export default Header
