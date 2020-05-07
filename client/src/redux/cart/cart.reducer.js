import CartActionTypes from './cart.types';

import { addItemToCart, removeItemFromCart } from './cart.utils'

const initialState = {
    cartItems: [],
    cartTotal: 0
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case CartActionTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case CartActionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        default:
            return state;
    }
}

export default cartReducer;