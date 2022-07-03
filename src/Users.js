import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import UserForm from './UserFrom';


const Users = ({ users, things, deleteUser })=> {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( user => {
            const userThings = things.filter(thing => thing.userId === user.id);
            return (
              <li key={ user.id }>
                { user.name } {userThings.length > 0 ? 'owns:' : 'owns nothing'}
              <ul>
                {
                  userThings.map(thing => {
                    return (
                      <li key={ thing.id }>
                          { thing.name }
                      </li>
                    )
                  })
                }
              </ul>
              <button onClick={() => { deleteUser(user)}}>Delete User</button>
              </li>
            );
          })
        }
      </ul>
      <UserForm />
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users,
    things: state.things
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: async(user) =>{
      await axios.delete(`/api/users/${user.id}`);
      dispatch({
        type: 'DELETE_USER',
        user
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
