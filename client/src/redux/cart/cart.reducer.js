import CartActionTypes from './cart.types';

import { addItemToCart, removeItemFromCart, fillCartOnLogin } from './cart.utils'

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
        case CartActionTypes.FILL_CART_ON_LOGIN:
            return {
                ...state,
                cartItems: fillCartOnLogin(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                cartItem => cartItem._id !== action.payload._id
                )
            };
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
}

export default cartReducer;