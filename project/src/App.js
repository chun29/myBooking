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
import CreateService from "./component/shops/CreateService";
import Staff from "./component/dashboard/Staff";
import Service from "./component/dashboard/Service";
import Calendar from "./component/dashboard/Calendar";
import BookingWebSetup from "./component/dashboard/BookingWebSetup";
import Template from "./component/onlineWebsite/Template";
import Online from "./component/dashboard/Online";

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
            <Route path="/staff" component={Staff} />
            <Route path="/service" component={Service} />
            <Route path="/createservice" component={CreateService} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/onlinebooking" component={BookingWebSetup} />
            <Route path="/booking/:id" component={Template} />
            <Route path="/online" component={Online} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
