export const initialState = {
    products: [],
    product: {},
    basket: [],
    user: null,
    country: null,
    openCart: false,
    menu: [
        'Prime Video',
        'AmazonBasics',
        'Buy Again',
        'Prime',
        'Best Sellers',
    ],
    footer: {
        'Get to Know Us': [
            'Careers',
            'Press Releases',
            'About us',
            'Blog',
            'Amazon Logistikblog',
            'Imprint'
        ],
        'Make Money with Us': [
            'Sell on Amazon',
            'Sell Under Private Brands',
            'Sell on Amazon Business',
            'Sell on Amazon Handmande',
            'Associates Programme',
            'Fulfilment by Amazon',
            'Seller Fulfilled Prime',
            'Independently Publish with Us'
        ],
        'Amazon Payment Methods': [
            'Amazon.de Visa Card',
            'Shop with points',
            'Credit Card',
            'Gift Cards'
        ],
        'Let Us Help you': [
            'COVID-19 and Amazon',
            'Track Packages or View Orders',
            'Delivery Rates & Policies',
            'Amazon Prime',
            'Returns & Replacements',
            'Recycling (including disposal of electrical and electronic equipment)'
        ]
    }
}

export const getBasketTotal = (basket) => (
    basket.reduce((total, basketItem) => (basketItem.price * basketItem.quantity) + total, 0)
)

export const getBasekTotalItem = (basket) => (
    basket.reduce((total, basketItem) => basketItem.quantity + total, 0)
)


export const getUserName = (email) => (
    email.substr(0, email.indexOf('@'))
)


const findBasketIndex = (basket, id) => (
    basket.findIndex(basketItem => basketItem.id === id)
)


const reducer = (state, action) => {

    switch(action.type) {

        case 'PRODUCT_DETAIL':
            return {
                ...state,
                product: action.product
            }

        case 'CLOSE_CART':
            return {
                ...state,
                openCart: false
            }

        case 'LOAD_PRODUCT':
            return {
                ...state,
                product: action.product
            }

        case 'LOAD_PRODUCTS':

            const products = action.products.map(p => ({...p, rating: 5, quantity: 10}))

            return {
                ...state,
                products: products
            }

        case 'ADD_TO_BASKET':

            let addBasket = (findBasketIndex(state.basket, action.item.id) >= 0)
                ?
                state.basket.map(basketItem => (basketItem.id === action.item.id
                    ?
                    {...basketItem, quantity: basketItem.quantity + action.item.quantity}
                    : basketItem
                ))
                :
                [...state.basket, action.item]

            return {
                ...state,
                openCart: true,
                basket: addBasket,
            }

        case 'ADD_TO_BASKET_FROM_CART':

            return {
                ...state,
                basket: state.basket.map(basketItem => (basketItem.id === action.id ? {...basketItem, quantity: parseInt(action.quantity)} : basketItem))
            }

        case 'REMOVE_FROM_BASKET':

            const index = findBasketIndex(state.basket, action.id)
            let newBasket = [...state.basket]

            if (index >= 0) {
                newBasket.splice(index, 1)
            } else {
                console.warn(`item not found ${action.id} in basket`)
            }

            return {
                ...state,
                basket: newBasket,
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'SET_COUNTRY':
            return {
                ...state,
                country: action.country
            }

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }

        default:
            return state
    }

}

export default reducer