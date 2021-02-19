import MenuIcon from '@material-ui/icons/Menu';
import { getUserName } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import './NavbarSecond.css'



const NavbarSecond = () => {

    const [{user, menu}, dispatch] = useStateValue()

    return (
        <div className="navbar">
            <div className="navbar__option option__all">
                <MenuIcon /> All
            </div>
            {(user) ?
                <div className="navbar__option">
                    { `${getUserName(user.email)}s Amazon` }
                </div>
                : ''
            }

            { menu.map((menuTitle, i) => (
                <div className="navbar__option" key={i}>
                    {menuTitle}
                </div>
            ))}
        </div>
    )
}

export default NavbarSecond