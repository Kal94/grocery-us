import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';


import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import RegisterPage from './pages/register/register.component';
import Login from './pages/login/login.component';
import Shop from './pages/shop/shop.component';
import ItemPage from './pages/item/item.component';
import BasketPage from './pages/basket/basket.component';
import CheckoutPage from'./pages/checkout/checkout.component';
import DeliveryPage from './pages/delivery/delivery.component';

const App = ({ currentUser }) => {
  return (
    <div className="background">
      <Header />
      <Switch>
        <Route exact path='/' render={() => !currentUser ? ( <HomePage />) : ( <Redirect to='/shop' /> )}/>
        <Route exact path='/register' render={() => !currentUser ? ( <RegisterPage />) : ( <Redirect to='/shop' /> )} />
        <Route exact path='/login' render={() => !currentUser ? ( <Login />) : ( <Redirect to='/shop' /> )} />
        <Route exact path='/shop' render={() => currentUser ? ( <Shop />) : ( <Redirect to='/' /> )} />
        <Route path='/items' component={ItemPage}  />
        <Route path='/basket' render={() => currentUser ? ( <BasketPage />) : ( <Redirect to='/' /> )} />
        <Route path='/delivery' render={() => currentUser ? ( <DeliveryPage />) : ( <Redirect to='/' /> )} />
        <Route path='/checkout' render={(props) => currentUser ? (<CheckoutPage {...props} />) : (<Redirect to='/' />)} />
      </Switch>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App);
