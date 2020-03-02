// /src/App.js
import React, { Component } from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Home from "./component/home/home";
import Dashboard from "./component/dashboard/Dashboard";
import SignIn from "./component/auth/Signin";
import Signup from "./component/auth/Signup";
import OpeningHours from "./component/dashboard/OpeningHours";
import CreateStaff from "./component/shops/CreateStaff";
import CreateBooking from "./component/shops/CreateBooking";
import CreateService from "./component/shops/CreateService";
import Staff from "./component/dashboard/Staff";
import Service from "./component/dashboard/Service";
import Calendar from "./component/dashboard/Calendar";
import BookingWebSetup from "./component/dashboard/BookingWebSetup";
import Template from "./component/onlineWebsite/Template";
import Online from "./component/dashboard/Online";
import NoMatchPage from "../../project/src/component/layout/404";
import Product from "../../project/src/component/home/Product";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return loggedIn ? <Comp {...props} /> : <Redirect to="/signin" />;
      }}
    />
  );
};

class App extends Component {
  state = {
    loggedIn: false
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/product" component={Product} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={Signup} />
            <ProtectedRoute
              path="/dashboard"
              loggedIn={this.props.auth.uid}
              component={Dashboard}
            />
            <ProtectedRoute
              path="/calendar"
              loggedIn={this.props.auth.uid}
              component={Calendar}
            />
            <ProtectedRoute
              path="/staff"
              loggedIn={this.props.auth.uid}
              component={Staff}
            />
            <ProtectedRoute
              path="/service"
              loggedIn={this.props.auth.uid}
              component={Service}
            />
            <ProtectedRoute
              path="/openingHours"
              loggedIn={this.props.auth.uid}
              component={OpeningHours}
            />
            <ProtectedRoute
              path="/online"
              loggedIn={this.props.auth.uid}
              component={Online}
            />
            <ProtectedRoute
              path="/onlinebooking"
              loggedIn={this.props.auth.uid}
              component={BookingWebSetup}
            />
            <ProtectedRoute
              path="/createstaff"
              loggedIn={this.props.auth.uid}
              component={CreateStaff}
            />
            <ProtectedRoute
              path="/createbooking"
              loggedIn={this.props.auth.uid}
              component={CreateBooking}
            />
            <ProtectedRoute
              path="/createservice"
              loggedIn={this.props.auth.uid}
              component={CreateService}
            />
            <Route path="/booking/:id" component={Template} />
            <Route path="*" component={NoMatchPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(App);
