/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import React, {Component} from "react";
import {Button, Col, Container, Form, FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import {registerUser} from "../../actions/auth.actions";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirm: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const {errors} = this.state;
        return (
            <Container>
                <Form onSubmit={this.onSubmit} noValidate>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="first_name">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="John" onChange={this.onChange}
                                              value={this.state.first_name} error={errors.first_name}
                                              className={classNames("", {invalid: errors.first_name})}/>
                                <FormControl.Feedback type="invalid" style={{display: "block"}}>
                                    {errors.first_name}
                                </FormControl.Feedback>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="last_name">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Doe" onChange={this.onChange}
                                              value={this.state.last_name} error={errors.last_name}
                                              className={classNames("", {invalid: errors.last_name})}/>
                                <FormControl.Feedback type="invalid" style={{display: "block"}}>
                                    {errors.last_name}
                                </FormControl.Feedback>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="john.doe@example.com" onChange={this.onChange}
                                      value={this.state.email} error={errors.email}
                                      className={classNames("", {invalid: errors.email})}/>
                        <FormControl.Feedback type="invalid" style={{display: "block"}}>
                            {errors.email}
                        </FormControl.Feedback>
                    </Form.Group>

                    <Form.Row>
                        <Col>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="******" onChange={this.onChange}
                                              value={this.state.password} error={errors.password}
                                              className={classNames("", {invalid: errors.password})}/>
                                <FormControl.Feedback type="invalid" style={{display: "block"}}>
                                    {errors.password}
                                </FormControl.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="password_confirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="******" onChange={this.onChange}
                                              value={this.state.password_confirm} error={errors.password_confirm}
                                              className={classNames("", {invalid: errors.password_confirm})}/>
                                <FormControl.Feedback type="invalid" style={{display: "block"}}>
                                    {errors.password_confirm}
                                </FormControl.Feedback>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Container>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));