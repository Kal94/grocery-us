import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

import {ReactComponent as Plus} from '../../assets/plus.svg'
import {ReactComponent as Minus} from '../../assets/minus.svg'

import { addToCart, removeFromCart, clearItem } from '../../redux/cart/cart.actions';

import './basket-item.styles.scss';

import { ReactComponent as Cross} from '../../assets/x-mark.svg';

const BasketItem = ({ cartItem, removeFromCart, addToCart, clearItem }) => {
    const { name, price, quantity, imageurl} = cartItem;

    const RemoveFromCart = () => {
        const { _id } = cartItem

        axios({
            method: 'post',
            url: `items/${_id}/remove`,
            data: {
              item: cartItem
            }
          })
            .then(response => {
                console.log(response.data);
                removeFromCart(cartItem);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const AddToCart = () => {
        const {_id} = cartItem

        axios({
            method: 'post',
            url: `items/${_id}/add`,
            data: {
              item: cartItem
            }
          })
            .then(response => {
                console.log(response.data);
                addToCart(cartItem);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const ClearFromCart = () => {
        const { _id } = cartItem

        axios({
            method: 'post',
            url: `items/${_id}/clear`,
            data: {
              item: cartItem
            }
          })
            .then(response => {
                console.log(response.data);
                clearItem(cartItem);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="basket-item">
            <div className="row align-items-center justify-content-around">
                <div className="col-2"><img src={`${imageurl}`} alt="basket-item" height="100px"/></div>
                <div className="col-4 basket-item">{name}</div>
                <div className="col-2 basket-item">£{(price/100).toFixed(2)}p</div>
                <div className="col-2 basket-item">
                    <Minus className="minus" onClick={RemoveFromCart}/>&nbsp;
                    {quantity}&nbsp;
                     <Plus className="plus" onClick={AddToCart}/>
                </div>
                <div className="col-2 basket-item remove-item"><Cross onClick={() => ClearFromCart(cartItem)}></Cross></div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    removeFromCart: item => dispatch(removeFromCart(item)),
    addToCart: item => dispatch(addToCart(item)),
    clearItem: item => dispatch(clearItem(item))
})

export default connect(null, mapDispatchToProps)(BasketItem);