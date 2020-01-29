// /src/App.js
import React, { Component } from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./home";
import Dashboard from "./component/dashboard/Dashboard";
import SignIn from "./component/auth/Signin";
import Signup from "./component/auth/Signup";
import Navbar from "./component/layout/Navbar";
import CreateStaff from "./component/shops/CreateStaff";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* The corresponding component will show here if the current URL matches the path */}
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={Signup} />
            <Route path="/createstaff" component={CreateStaff} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
