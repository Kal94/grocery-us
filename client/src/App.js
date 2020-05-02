import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import RegisterPage from './pages/register/register.component';
import Login from './pages/login/login.component';
import Shop from './pages/shop/shop.component';

const App = () => {
  return (
    <div className="background">
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/shop' component={Shop} />
      </Switch>
    </div>
  )
}

export default App;
