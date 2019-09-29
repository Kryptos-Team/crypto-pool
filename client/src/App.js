/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/private-route/PrivateRoute";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <NavBar/>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/login/" component={Login}/>
                <Route exact path="/register/" component={Register}/>
                <Switch>
                    <PrivateRoute exact path="/dashboard/" component={Dashboard}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
