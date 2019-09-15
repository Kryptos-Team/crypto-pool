/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import React, {Component} from "react";
import {Admin as RAdmin, Resource} from "react-admin";
import {dataProvider} from "../../rootSaga";
import {UserCreate, UserEdit, UserList} from "../../containers/accounts/Users";
import UserIcon from '@material-ui/icons/Group';
import Dashboard from "./Dashboard";

class Admin extends Component {
    render() {
        return (
            <RAdmin dataProvider={dataProvider} dashboard={Dashboard}>
                <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon}/>
            </RAdmin>
        );
    }
}

export default Admin;