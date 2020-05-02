import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import CustomButton from '../../components/custom-button/custom-button.component';

import './homepage.styles.scss'

const HomePage = () => {

    const [register, setRegister] = useState('Register');
    const [login, setLogin] = useState('Login');

    return (
        <div className="background">
        <div className="container content">
            <div className="row">
                <div className="col"></div>
                <div className="col-8">
                    <h1 className="greeting">Welcome to <span className="brand">GroceryUs</span></h1>
                </div>
                <div className="col"></div>
            </div>
            <div className="row mt-5">
                <div className="col"></div>
                <div className="col-12 col-sm-4 mt-1 d-flex justify-content-center justify-content-sm-end">
                    <Link to='/register'>
                        <CustomButton 
                            onMouseEnter={() => setRegister('Join us!')} 
                            onMouseLeave={() => setRegister('Register')}
                            isRegister
                        >
                            {register}
                        </CustomButton>
                    </Link>
                    </div>
                    <div className="col-12 col-sm-4 mt-1 d-flex justify-content-center justify-content-sm-start">
                    <Link to="/login">
                        <CustomButton 
                            onMouseEnter={() => setLogin('Welcome back!')} 
                            onMouseLeave={() => setLogin('Login')} 
                            isLogin
                        >
                            {login}
                        </CustomButton>
                    </Link>
                </div>
                <div className="col"></div>
            </div>
        </div>
    </div>
    )
}

export default HomePage;

