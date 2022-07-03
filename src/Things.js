import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';


const Things = ({ things, users, deleteThing, increaseRating, decreaseRating })=> {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name } *Item Rank: {thing.ranking}
                <button onClick={() => {decreaseRating(thing)}}>-</button>
                <button onClick={() => {increaseRating(thing)}}>+</button>
                owned by:
                <select defaultValue={ thing.userId }>
                  {
                    users.map(user => {
                      return (
                        thing.userId ? <option value={user.id} key={user.id}>{user.name}</option> : <option key={user.id}>Item has no owner</option>
                      )
                    })
                  }

                </select>
                <button onClick={() => {deleteThing(thing)}}>Delete Item</button>
              </li>
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Things);

