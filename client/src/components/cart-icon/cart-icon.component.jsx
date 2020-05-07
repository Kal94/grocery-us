import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartTotal } from '../../redux/cart/cart.selectors';

import { ReactComponent as CartSvg } from '../../assets/cart.svg';
import './cart-icon.styles.scss';

const CartIcon =  ({ total }) => (
    <div className="cart-icon">
        <CartSvg className="cart-svg" />
        <span className="cart-total">£{(total/100).toFixed(2)}</span>
    </div>
)

const mapStateToProps = createStructuredSelector ({
    total: selectCartTotal
})

export default connect(mapStateToProps)(CartIcon);