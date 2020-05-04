import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav } from 'react-bootstrap';

import axios from 'axios'

import './header.styles.scss';

const Header = ({ currentUser }) => {

    const logout = (eventKey) => {
        axios.get(`${eventKey}`)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }

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
                        <p className="nav-link">Hello, {currentUser.name}</p>
                    </li>
                    <li className="nav-item">
                        <Nav.Link className="nav-link" eventKey="logout" onSelect={logout}>Logout</Nav.Link>
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

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
  });

export default connect(mapStateToProps)(Header);