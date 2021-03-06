import React from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Home from "./component/home/Home";
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
import { connect } from "react-redux";
import ScrollToTop from "./ScrollToTop";

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

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <ScrollToTop />
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={Signup} />
            <ProtectedRoute
              path="/dashboard"
              loggedIn={this.props.auth.uid && this.props.emailVerified}
              component={Dashboard}
            />
            <ProtectedRoute
              path="/calendar"
              loggedIn={this.props.auth.uid && this.props.emailVerified}
              component={Calendar}
            />
            <ProtectedRoute
              path="/staff"
              loggedIn={this.props.auth.uid && this.props.emailVerified}
              component={Staff}
            />
            <ProtectedRoute
              path="/service"
              loggedIn={this.props.auth.uid && this.props.emailVerified}
              component={Service}
            />
            <ProtectedRoute
              path="/openingHours"
              loggedIn={this.props.auth.uid && this.props.emailVerified}
              component={OpeningHours}
            />
            <ProtectedRoute
              path="/online"
              loggedIn={this.props.auth.uid && this.props.emailVerified}
              component={Online}
            />
            <ProtectedRoute
              path="/onlinebooking"
              loggedIn={this.props.auth.uid && this.props.emailVerified}
              component={BookingWebSetup}
            />
            <ProtectedRoute
              path="/createstaff"
              loggedIn={this.props.auth.uid && this.props.emailVerified}
              component={CreateStaff}
            />
            <ProtectedRoute
              path="/createbooking"
              loggedIn={this.props.auth.uid && this.props.emailVerified}
              component={CreateBooking}
            />
            <ProtectedRoute
              path="/createservice"
              loggedIn={this.props.auth.uid && this.props.emailVerified}
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
    auth: state.firebase.auth,
    emailVerified: state.firebase.auth.emailVerified
  };
};

export default connect(mapStateToProps)(App);
