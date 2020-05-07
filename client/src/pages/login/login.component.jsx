import React from 'react';
import { connect } from 'react-redux';

import './login.styles.scss';

import { Form } from 'react-bootstrap'
import axios from 'axios';
import { setCurrentUser } from '../../redux/user/user.actions';

import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';

class Login extends React.Component {
    constructor(){
        super();

        this.state = {
            email: '',
            password:''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        const { email, password } = this.state;
        const { setCurrentUser } = this.props
       
        axios
            .post('/login/user', {
                username: email,
                password: password
            })
            .then(response => {
                const user = response.data;
                setCurrentUser(user)
                this.props.history.push('/shop')
        }).catch(error => {
            console.log('error');
        });
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="background">
                <div className="container">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6 mt-5">
                        <Form className='login-form' onSubmit={this.handleSubmit}>
    
                            <h1 className="login-heading mb-5">Login</h1>
                        
                            <FormInput
                                label="Email"
                                type="email"
                                placeholder="Email"
                                controlId="Email"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                                required
                            />
                            <FormInput
                                label="Password"
                                type="password"
                                placeholder="Password"
                                controlId="Password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                required
                            />
                            <div className="row justify-content-end login-button">
                            <CustomButton isLogin>
                                Login
                            </CustomButton>
                            </div>
                            </Form>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(Login);