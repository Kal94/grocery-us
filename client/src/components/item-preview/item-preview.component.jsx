import React from 'react';
import { Link } from 'react-router-dom';

import './item-preview.styles.scss'

const Item = ({item}) => {
    return (
        <Link to={{
            pathname: "/items",
            state:  {
                id: item._id
            }
        }}  className="col-3 justify-content-center item">
            <img src={item.imageurl} alt="item" height="100px"/>
            <h6 className="mt-2">{item.name}</h6>
            <h6>£{(item.price/100).toFixed(2)}p</h6>
        </Link>
    )
}

export default Item;