/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import React, {Component} from "react";
import {Button, Container, Form, FormControl} from "react-bootstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import {loginUser} from "../../actions/auth.actions";
import {connect} from "react-redux";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps);
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard/");
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard/");
        }
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
    };

    render() {
        const {errors} = this.state;
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.onChange}
                                      value={this.state.email} error={errors.email}
                                      className={classNames("", {invalid: errors.email || errors.emailNotFound})}/>
                        <FormControl.Feedback type="invalid" style={{display: "block"}}>
                            {errors.email}
                        </FormControl.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.onChange}
                                      value={this.state.password} error={errors.password}
                                      className={classNames("", {invalid: errors.password || errors.passwordIncorrect})}/>
                        <FormControl.Feedback type="invalid" style={{display: "block"}}>
                            {errors.password}
                        </FormControl.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Container>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);