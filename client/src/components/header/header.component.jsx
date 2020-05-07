import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { signOut } from '../../redux/user/user.actions';

import CartIcon from '../cart-icon/cart-icon.component';

import './header.styles.scss';

const Header = ({ currentUser, signOut }) => {

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-transparent">
        <Link className="navbar-brand" to='/'>GroceryUs</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        {
            currentUser ? (
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <p className="nav-link">Hello, {(currentUser.name.split(" "))[0]}</p>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/shop">Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/basket"><CartIcon /></Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link className="nav-link" eventKey="logout" onSelect={signOut}>Logout</Nav.Link>
                    </li>
                    </ul>
                </div>
            ) : (
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    </ul>
                </div>
            )
        }
        </nav>
    )
}

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut())
  });

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
  });

export default connect(mapStateToProps, mapDispatchToProps)(Header);