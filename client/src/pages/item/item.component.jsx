import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import CustomButton from '../../components/custom-button/custom-button.component';
import {ReactComponent as Arrow} from '../../assets/arrow.svg'

import { addToCart } from '../../redux/cart/cart.actions'

import './item.styles.scss';

class ItemPage extends React.Component {
    constructor(){
        super();

        this.state = {
            item: {}
        }
    }

    componentDidMount(){
        const { id } = this.props.location.state;

        axios.get(`items/${id}`)
            .then(response => {
                this.setState({item: response.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        const { name, price, imageurl, description } = this.state.item
        const { addToCart } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-10">
                        <div className="row align-items-center item-page-container">
                            <div className="col-6">
                                <div className="align-self-start"><Arrow /></div>
                                <img src={imageurl} alt="item" />
                            </div>
                            <div className="vl"></div>
                            <div className="col-6">
                                <h3 className="name">{name}</h3>
                                <p>{description}</p>
                                <p className="price">£{(price/100).toFixed(2)}p</p>
                                <div className="price"><CustomButton onClick={() => addToCart(this.state.item)} isAddToCart>Add to cart</CustomButton></div>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addToCart: item => dispatch(addToCart(item))
})

export default connect(null, mapDispatchToProps)(ItemPage);