import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import CustomButton from '../../components/custom-button/custom-button.component'
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartTotal } from '../../redux/cart/cart.selectors';

import { loadStripe } from '@stripe/stripe-js'

import './checkout.styles.scss';

const fetchCheckoutSession = (total) => {
    return axios({
        url: 'create-checkout-session',
        method: 'post',
        data: {
            total
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        console.log(error);
        alert('There was an error, please try again.')
    });
}

const CheckoutPage = ({ currentUser, cartTotal, state, ...props }) => {

    const {date, time} = props.location.state

    var text = ''
    var deliveryCharge

    if(time === '9'){
        text = '9am - 12pm'
        deliveryCharge = 5.99
    } else if(time === '12'){
        text = '12pm - 3pm'
        deliveryCharge = 6.99
    } else {
        text = '3pm - 6pm'
        deliveryCharge = 4.99
    }

    const subtotal = (cartTotal/100)
    const total = subtotal + deliveryCharge

    const { name, address1, address2, towncity, postcode } = currentUser

    const handleClick = (event) => {
        fetchCheckoutSession(total).then(data => {
            const { sessionId } = data
            const {error} = state.stripe.redirectToCheckout({
                sessionId
            })
        })
    }
    
    return (
        <div className="checkout-page">
            <div className="container">
                    <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8 mt-5">
                        <div className="basket">
                            <h3 className="checkout-header">Checkout</h3>
                            <h4>Customer details</h4>
                            <p className="shipping-details">{name}</p>
                            <p className="shipping-details">{address1}</p>
                            {address2 ? <p className="shipping-details">{address2}</p> : null}
                            <p className="shipping-details">{towncity}</p>
                            <p className="shipping-details">{postcode}</p>
                            <br />
                            <h4>Scheduled for delivery on</h4>
                            <p className="shipping-details">{date}</p>
                            <p className="shipping-details">between {text}</p>
                            <br />
                            <h4>Total</h4>
                            <p className="shipping-details">Subtotal : £{subtotal.toFixed(2)}</p>
                            <p className="shipping-details">Delivery Charge : £{deliveryCharge}</p>
                            <p className="shipping-details"><b>Total Charge : £{total.toFixed(2)}</b></p>
                            <br />
                            <CustomButton onClick={handleClick}>Pay {total.toFixed(2)}</CustomButton>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartTotal: selectCartTotal
});
export default connect(mapStateToProps)(CheckoutPage);