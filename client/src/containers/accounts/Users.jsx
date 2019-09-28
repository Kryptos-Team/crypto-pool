/*
 * Copyright (c) 2019. Abhimanyu Saharan <desk.abhimanyu@gmail.com>
 */

import React from 'react';
import {
    BooleanField,
    Create,
    Datagrid,
    DateField,
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
                    <TextField source="username"/>
                    <TextField source="first_name"/>
                    <TextField source="last_name"/>
                    <EmailField source="email"/>
                    <BooleanField source="is_staff"/>
                    <BooleanField source="is_active"/>
                    <BooleanField source="is_superuser"/>
                    <DateField source="date_joined"/>
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
            <TextField source="username"/>
            <TextField source="first_name"/>
            <TextField source="last_name"/>
            <EmailField source="email"/>
            <BooleanField source="is_staff"/>
            <BooleanField source="is_active"/>
            <BooleanField source="is_superuser"/>
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextField source="username"/>
            <TextField source="first_name"/>
            <TextField source="last_name"/>
            <EmailField source="email"/>
            <BooleanField source="is_staff"/>
            <BooleanField source="is_active"/>
            <BooleanField source="is_superuser"/>
        </SimpleForm>
    </Create>
);