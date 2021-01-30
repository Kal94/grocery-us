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

     AddToCart = item => {
         const { id } = this.props.location.state;
         const { addToCart } = this.props;
         addToCart(item);
         axios({
             method: 'post',
             url: `items/${id}/add`,
             data: {
               item: item
             }
           })
             .then(response => {
                 console.log(response.data);
             })
             .catch(error => {
                 console.log(error);
             });
     }

    render(){
        const { name, price, imageurl } = this.state.item
        return (
            <div className="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="item-page-container">
                            <div className="align-self-start"><Arrow /></div>
                            <img src={imageurl} alt="item" height="200px"/>
                            <h3 className="name">{name}</h3>
                            <p className="price">£{(price/100).toFixed(2)}p</p>
                            <div className="price"><CustomButton onClick={() => this.AddToCart(this.state.item)} isAddToCart>Add to cart</CustomButton></div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addToCart: item => dispatch(addToCart(item))
})

export default connect(null, mapDispatchToProps)(ItemPage);