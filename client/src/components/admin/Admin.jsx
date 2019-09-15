/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import React, {Component} from "react";
import {Admin as RAdmin, Resource} from "react-admin";
import {dataProvider} from "../../rootSaga";
import {UserCreate, UserEdit, UserList} from "../../containers/accounts/Users";
import UserIcon from '@material-ui/icons/Group';
import Dashboard from "./Dashboard";
import adminAuthProvider from "../../providers/adminAuth.providers";

class Admin extends Component {
    render() {
        return (
            <RAdmin dataProvider={dataProvider} dashboard={Dashboard} authProvider={adminAuthProvider}>
                {permissions => [
                    permissions === "superuser" || permissions === "staff" ?
                        <Resource name="users"
                                  list={UserList}
                                  edit={permissions === "superuser" ? UserEdit : null}
                                  create={permissions === "superuser" ? UserCreate : null}
                                  icon={UserIcon}/>
                        : null
                ]}
            </RAdmin>
        );
    }
}

export default Admin;