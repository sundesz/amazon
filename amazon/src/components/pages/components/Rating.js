import { propTypes } from 'prop-types'
import './Rating.css'

const Rating = ({rating}) => {
    return (
        <div className="rating">
            {Array(rating).fill().map((_,i) => <p key={i}>*</p>)}
        </div>
    )
}

// Rating.propTypes = {
//     rating: propTypes.number.isRequired,
// }

export default Rating