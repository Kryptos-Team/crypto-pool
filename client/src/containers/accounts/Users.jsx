/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import React from 'react';
import {
    Create,
    Datagrid,
    Edit,
    EmailField,
    Filter,
    List,
    Responsive,
    SimpleForm,
    SimpleList,
    TextField,
    TextInput
} from 'react-admin';

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
    </Filter>
);

export const UserList = (props) => (
    <List filters={<UserFilter/>} {...props}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => record.email}
                />
            }
            medium={
                <Datagrid rowClick="edit">
                    <TextField source="id"/>
                    <TextField source="name"/>
                    <EmailField source="email"/>
                </Datagrid>
            }
        />
    </List>
);

const UserTitle = ({record}) => {
    return <span>Editing user: {record ? `${record.name}` : ''}</span>
};

export const UserEdit = props => (
    <Edit title={<UserTitle/>} {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="email"/>
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="email"/>
        </SimpleForm>
    </Create>
);