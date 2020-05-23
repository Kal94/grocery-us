import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Basketitem from '../../components/basket-item/basket-item.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import './basket.styles.scss';

const BasketPage = ({ cartItems, cartTotal }) => {
    return (
        <div className="checkout-page">
            <div className="container">
                {cartItems.length ? (
                    <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10 mt-5">
                        <div className="basket">
                            <h3>Basket</h3>
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-4"><h5 className="table-header">Item</h5></div>
                                <div className="col-2"><h5 className="table-header">Price</h5></div>
                                <div className="col-2"><h5 className="table-header">Qty</h5></div>
                                <div className="col-2"><h5 className="table-header">Remove</h5></div>
                            </div>
                            {cartItems.map(cartItem => (
                                <Basketitem key={cartItem._id} cartItem={cartItem} />
                            ))}
                        <div className="mt-4"><h4 className="total">Total: £{(cartTotal/100).toFixed(2)}</h4></div>
                        <div className="mt-3 checkout-button">
                            <Link to="/delivery">
                                <CustomButton isAddToCart>Next: Delivery Slot</CustomButton>
                            </Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-1">
                    </div>
                </div>
                ) : (
                    <div className="row">
                        <div className="col-1"></div>
                    <div className="col-10 mt-5">
                        <div className="checkout">
                            <h3>Basket</h3>
                            <h6 className="mt-5 empty-basket">There are no items in your basket</h6>
                        </div>
                    </div>
                    <div className="col-1">
                    </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems,
    cartTotal: selectCartTotal
})

export default connect(mapStateToProps)(BasketPage);