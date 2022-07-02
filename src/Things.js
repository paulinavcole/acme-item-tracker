import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    things: state.things
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteThing: async(thing) => {
      dispatch({
        type: 'DELETE_THING',
        thing
      });
    }
  }
};

const Things = ({ things, deleteThing })=> {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name } *Item Rank: {thing.ranking}
                <button onClick={() => {deleteThing(thing)}}>Delete Random Item</button>
              </li>
            );
          })
        }
      </ul>
      <ThingForm />
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(Things);

