import { useStateValue } from '../../StateProvider'
import './Footer.css'

const Footer = () => {

    const [{footer}, dispatch] = useStateValue()

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }

    return (
        <div className="footer">
            <div className="footer__top">
                <div style={{cursor: 'pointer'}} onClick={() => scrollToTop()}>Back to top</div>
            </div>
            <div className="footer__middle">
                <div className="footer__middle__contain">
                    {
                    Object.keys(footer).map((footerColumn, i) => (
                        <div className="footer__column" key={i}>
                            <h4>{footerColumn}</h4>
                            <div className="column__item">
                            {footer[footerColumn].map((footerItem, i) => (
                                <p key={i}>{footerItem}</p>
                            ))}
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
            <div className="footer__bottom">
                Conditions of Use & Sale
            </div>
        </div>
    )
}

export default Footer