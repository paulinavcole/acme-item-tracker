import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';


const Things = ({ things, users, deleteThing, increaseRating, decreaseRating, updateUser })=> {
  things.sort((a, b) => (a.ranking < b.ranking) ? 1 : -1)

  return (
    <div>
      <h1>Things:</h1>
      <ul>
        {
          things.map( thing => {
            return (
              <div>
              <li key={ thing.id }>
                <strong>{ thing.name }</strong>
                <br></br>
                *Item Rank: {thing.ranking}
                <br></br>
                <button onClick={() => {decreaseRating(thing)}}>-</button>
                <button onClick={() => {increaseRating(thing)}}>+</button>
                <br></br>
                Owned by:
                <select defaultValue={thing.userId ? thing.userId: ''} onChange={(ev) => updateUser(ev, thing)}>
                  <option value={0}>Item has no owner</option>
                  {
                    users.map(user => {
                      return (
                        <option value={user.id} key={user.id}>{user.name}</option>
                      )
                    })
                  }

                </select>
                <br></br>
                <button onClick={() => {deleteThing(thing)}}>Delete Item</button>
              </li>
              <br></br>
              </div>
            );
          })
        }
      </ul>
      <ThingForm />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    things: state.things,
    users: state.users
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteThing: async(thing) => {
      dispatch({
        type: 'DELETE_THING',
        thing
      });
    },
    increaseRating: async(thing) => {
      const updatedThing = (await axios.put(`/api/things/${thing.id}`, {ranking: thing.ranking +1})).data;
      dispatch({
        type: 'INCREASE_RANKING',
        updatedThing
      })
    },
    decreaseRating: async(thing) => {
      const updatedThing = (await axios.put(`/api/things/${thing.id}`, {ranking: thing.ranking -1})).data;
      dispatch({
        type: 'DECREASE_RANKING',
        updatedThing
      })
    },
    updateUser: async(ev, thing) => {
      const newUserId = ev.target.value * 1;
      const updatedThing = (await axios.put(`/api/things/${thing.id}`, {userId: newUserId ? newUserId: null})).data;
      dispatch({
        type: 'UPDATE_USER',
        updatedThing
      })
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Things);

