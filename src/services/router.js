import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../App";
import Home from "../NewPages/Home";

import AdminLogin from "../NewPages/Admin/AdminLogin";
import AdminHome from "../NewPages/Admin/AdminHome";

export default class RouterContainer extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={Home} />

          {/* admin */}
          <Route path="/admin" exact component={AdminLogin} />
          <Route path="/adminhome" exact component={AdminHome} />

          {/* <Route path="/creat" exact component={UserCreate} />
          <Route path="/counttable" exact component={CheckCount} />
          <Route path="/agent" exact component={AgentDetail} />
          <Route path="/report" exact component={Reports} /> */}
          {/* super admin */}
          {/* <Route path="/superhome" exact component={SuperHome} /> */}
        </Router>
      </div>
    );
  }
}
