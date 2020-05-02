import React from 'react';

import './item.styles.scss'

const Item = ({item}) => {
    return (
        <div className="col-3 justify-content-center item">
            <img src={item.imageurl} alt="item" height="100px"/>
            <h6 className="mt-2">{item.name}</h6>
            <h6>£{(item.price/100).toFixed(2)}p</h6>
        </div>
    )
}

export default Item;