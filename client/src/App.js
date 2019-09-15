/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import {Provider} from "react-redux";
import store from "./store.js";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/private-route/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {logoutUser, setCurrentUser} from "./actions/auth.actions";

// Check for token to keep the user logged in
if (localStorage.getItem("jwtToken")) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}

class App extends Component {
    render() {
        return (

            <Provider store={store}>
                <Router>
                    <NavBar/>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Switch>
                        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
