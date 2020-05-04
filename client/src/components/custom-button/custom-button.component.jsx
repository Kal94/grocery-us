import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isRegister, isLogin, isAddToCart, ...props }) => {
    return (
        <button 
            className=
            {`${isRegister ? 'register' : ''} ${isLogin ? 'login' : ''} ${isAddToCart ? 'add-to-cart' : ''} custom-button`} 
            {...props}
        >
            {children}
        </button>
    )
}

export default CustomButton;