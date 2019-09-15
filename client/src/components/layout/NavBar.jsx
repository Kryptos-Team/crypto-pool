/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import React, {Component} from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logoutUser} from "../../actions/auth.actions";

class NavBar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const {auth} = this.props;
        return (
            <Navbar bg="light" expand="lg">
                {auth.isAuthenticated && (auth.user.is_staff || auth.user.is_superuser) &&
                <Navbar.Brand href="/admin/">Mining Pool</Navbar.Brand>}
                {auth.isAuthenticated && !auth.user.is_staff &&
                <Navbar.Brand href="/home/">Mining Pool</Navbar.Brand>}
                {!auth.isAuthenticated &&
                <Navbar.Brand href="/">Mining Pool</Navbar.Brand>}
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {auth.isAuthenticated && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {!auth.isAuthenticated && <Nav.Link href="/login/">Login</Nav.Link>}
                    {!auth.isAuthenticated && <Nav.Link href="/register/">Register</Nav.Link>}
                    {auth.isAuthenticated &&
                    <NavDropdown title={auth.user.display_name} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#logout" onClick={this.onLogoutClick}>Logout</NavDropdown.Item>
                    </NavDropdown>}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


NavBar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(NavBar);