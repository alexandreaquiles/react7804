import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';

class Roteamento extends Component {
    render() {

        return (

            <Switch>
                <Route path="/" component={ Home } exact />
                <Route path="/login" component={ LoginPage } exact />
            </Switch>

        );
    }
}

export default Roteamento;