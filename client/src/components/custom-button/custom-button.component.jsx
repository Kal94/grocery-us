import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isRegister, isLogin, ...props }) => {
    return (
        <button 
            className=
            {`${isRegister ? 'register' : ''} ${isLogin ? 'login' : ''} custom-button`} 
            {...props}
        >
            {children}
        </button>
    )
}

export default CustomButton;