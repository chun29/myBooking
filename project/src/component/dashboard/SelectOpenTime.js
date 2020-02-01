import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class SelectOpenTime extends Component {
  state = {
    openTime: "8"
  };
  handleSelect = e => {
    this.setState({ openTime: e.target.value });
  };
  render() {
    return (
      <div className="set-container">
        <label>
          <div className="workingHours-startTime-container">
            <select value={this.state.openTime} onChange={this.handleSelect}>
              <option value="8">08:00</option>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
            </select>
          </div>
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    store: state.firestore.ordered.store
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "store"
    }
  ])
)(SelectOpenTime);
