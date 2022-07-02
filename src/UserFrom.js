import React from "react";
import { connect } from 'react-redux';
import axios from 'axios';
const { faker } = require('@faker-js/faker');

const UserForm = ({ createUser }) => {
    return (
        <div>
            <button onClick={ createUser }>Add New User</button>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: async () => {
            const response = await axios.post('/api/users', {
                name: `${faker.name.firstName()} ${faker.name.lastName()}`
            });
            const user = response.data;
            dispatch({
                type: 'CREATE_USER',
                user
            });
        }
    };
};

export default connect(null, mapDispatchToProps)(UserForm)