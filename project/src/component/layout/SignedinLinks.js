import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { signOut } from "../../store/actions/authAction";
import "../../style/signedinLink.css";

class SignedInLinks extends Component {
  render() {
    console.log(this.props);
    const { name, auth } = this.props;
    let user = "";

    if (name) {
      const shortName = name.find(function(userName) {
        return userName.id === auth.uid;
      });
      user = shortName.name.charAt(0).toUpperCase();
    }

    const userName = auth.uid ? user : "";

    return (
      <React.Fragment>
        <ul>
          <li>
            <NavLink to="/dashboard">
              <button className="login-btn">前往管理系統</button>
            </NavLink>
          </li>
          <li>
            <a onClick={this.props.signOut}>
              <button className="login-btn">登出</button>
            </a>
          </li>
          <li>
            <NavLink to="/">
              <div className="user-avatar">{userName}</div>
            </NavLink>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    name: state.firestore.ordered.owners
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: "owners"
    }
  ])
)(SignedInLinks);
