import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router';

import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';

import { setCurrentUser } from '../../redux/user/user.actions';

import './register.styles.scss'

class RegisterPage extends React.Component {
    constructor(){
        super();

        this.state = {
            name: '',
            address1: '',
            address2: '',
            towncity: '',
            postcode: '',
            email: '',
            password: '',
            confirmPassword: '',
            redirect: false
        }
    }
    

    handleSubmit = event => {
        event.preventDefault();

        const { name, address1, address2, towncity, postcode, email, password } = this.state;
        const { setCurrentUser } = this.props
       
        axios({
            url: 'register/newuser',
            method: 'post',
            data: {
                name,
                address1,
                address2,
                towncity,
                postcode,
                email,
                password
            }
        }).then(response => {
            const user = response.data;
            setCurrentUser(user)
            this.setState({redirect: true})
        }).catch(error => {
            console.log(error);
            alert('There was an error, please try again.')
        });
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const { name, address1, address2, towncity, postcode, email, password, confirmPassword, redirect } = this.state;
        return (
            <div className="background">
                <div className="container">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6 mt-5">
                        <Form className='registration-form' onSubmit={this.handleSubmit}>
    
                            <h1 className="register-heading mb-5">Register</h1>
                        
                            <FormInput
                                label="Name"
                                type="text"
                                placeholder="Name"
                                controlId="name"
                                name="name"
                                value={name}
                                onChange={this.handleChange}
                                required
                            />
                            <FormInput
                                label="Address"
                                type="text"
                                placeholder="Address Line 1"
                                controlId="Address"
                                name="address1"
                                value={address1}
                                onChange={this.handleChange}
                                required
                            />
                            <FormInput
                                label=""
                                type="text"
                                placeholder="Address Line 2"
                                controlId="Address"
                                name="address2"
                                value={address2}
                                onChange={this.handleChange}
                            />
                            <FormInput
                                label="Town/City"
                                type="text"
                                placeholder="Town/City"
                                controlId="Address"
                                name="towncity"
                                value={towncity}
                                onChange={this.handleChange}
                                required
                            />
                            <FormInput
                                label="Postcode"
                                type="text"
                                placeholder="Postcode"
                                controlId="Address"
                                name="postcode"
                                value={postcode}
                                onChange={this.handleChange}
                                required
                            />
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
                            <FormInput
                                label="Confirm"
                                type="password"
                                placeholder="Confirm Password"
                                controlId="Password"
                                name="confirmpassword"
                                value={confirmPassword}
                                onChange={this.handleChange}
                                required
                            />
    
                        <div className="row justify-content-end register-button">
                        <CustomButton isRegister>
                            Register
                        </CustomButton>
                        </div>
                        </Form>
                        </div>
                        <div className="col-3"></div>
                        {redirect && (
                            <Redirect to={'/shop'}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  });

export default connect(null, mapDispatchToProps)(RegisterPage);