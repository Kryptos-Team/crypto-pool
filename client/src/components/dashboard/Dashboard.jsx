/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Container} from "react-bootstrap";

class Dashboard extends Component {
    render() {
        const {user} = this.props.auth;

        return (
            <Container>
                <b>Hey there,</b> {user.first_name}
            </Container>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Dashboard);