import { createSelector } from 'reselect';

const selectCart = state => state.cart

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
)

export const selectCartTotal = createSelector  (
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (totalQuantity, cartItem) =>
                totalQuantity + cartItem.quantity * cartItem.price,
        0
    )
)