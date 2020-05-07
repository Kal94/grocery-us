import React from 'react';
import { connect } from 'react-redux';

import { removeFromCart } from '../../redux/cart/cart.actions';

import './basket-item.styles.scss';

import { ReactComponent as Cross} from '../../assets/x-mark.svg'

const BasketItem = ({ cartItem, removeFromCart }) => {
    const { name, price, quantity, imageurl} = cartItem;
    return (
        <div className="basket-item">
            <div className="row align-items-center justify-content-around">
                <div className="col-2"><img src={`${imageurl}`} /></div>
                <div className="col-5 basket-item">{name}</div>
                <div className="col-2 basket-item">£{(price/100).toFixed(2)}p</div>
                <div className="col-1 basket-item">{quantity}</div>
                <div className="col-2 basket-item"><Cross onClick={() => removeFromCart(cartItem)}></Cross></div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    removeFromCart: item => dispatch(removeFromCart(item))
})

export default connect(null, mapDispatchToProps)(BasketItem);