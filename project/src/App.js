// /src/App.js
import React, { Component } from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./component/home/home";
import Dashboard from "./component/dashboard/Dashboard";
import SignIn from "./component/auth/Signin";
import Signup from "./component/auth/Signup";
import OpeningHours from "./component/dashboard/OpeningHours";
import CreateStaff from "./component/shops/CreateStaff";
import CreateBooking from "./component/shops/CreateBooking";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={Signup} />
            <Route path="/createstaff" component={CreateStaff} />
            <Route path="/createbooking" component={CreateBooking} />
            <Route path="/openingHours" component={OpeningHours} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
