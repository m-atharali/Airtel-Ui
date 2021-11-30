import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../App";
import Home from "../NewPages/Home";
import AgentLogin from "../NewPages/AgentLogin";
import WelcomePage from "../NewPages/WelcomePage";
import EnterNIN from "../NewPages/FacialVerification";
import Confirmation from "../NewPages/Confirmation";
import AdminLogin from "../NewPages/Admin/AdminLogin";
import AdminHome from "../NewPages/Admin/AdminHome";
import UserCreate from "../NewPages/Admin/CreatUser";
import CheckCount from "../NewPages/Admin/CheckCount";
import AgentDetail from "../NewPages/Admin/AgentDetail";
import Reports from "../NewPages/Admin/Reports";

import SuperHome from "../NewPages/Admin/SuperAdmin/Home";

export default class RouterContainer extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={AgentLogin} />
          <Route path="/welcome" exact component={WelcomePage} />
          <Route path="/nin" exact component={EnterNIN} />
          <Route path="/confirmation" exact component={Confirmation} />
          {/* admin */}
          <Route path="/admin" exact component={AdminLogin} />
          <Route path="/adminhome" exact component={AdminHome} />
          <Route path="/creat" exact component={UserCreate} />
          <Route path="/counttable" exact component={CheckCount} />
          <Route path="/agent" exact component={AgentDetail} />
          <Route path="/report" exact component={Reports} />
          {/* super admin */}
          <Route path="/superhome" exact component={SuperHome} />
        </Router>
      </div>
    );
  }
}
