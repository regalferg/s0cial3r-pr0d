import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProfileList from "./pages/ProfileList";
import NoMatch from "./pages/NoMatch";
import Feed from "./pages/Feed";
import Browse from "./pages/Browse";
import socialit from "./pages/socialit"
import socialitComment from "./pages/socialit/SocialitComment"
import PrivateMessages from "./pages/PrivateMessages"

const App = () =>
<Router>
  <div id="app">
    <Switch>
        <Route exact path="/" component = {Login} />
        {/* <Route exact path="/dashboard" component = {Dashboard} /> */}
        {/* <Route exact path="dashboard/update" component={UpdateDashboard} /> */}
        <Route exact path="/profile/:username" component={Profile} />
        <Route exact path="/ProfileList" component={ProfileList} />
        <Route exact path="/Browse" component={Browse} />
        <Route exact path="/socialit" component={socialit} />
        <Route exact path="/PrivateMessages" component={PrivateMessages} />
        <Route exact path="/PrivateMessages/:id" component={PrivateMessages} />
        <Route exact path="/socialit/:channel" component={socialit} />
        <Route exact path="/socialit/:channel/:id" component={socialitComment} />
        <Route exact path="/:channel" component={Feed} />
        <Route component={NoMatch} />
    </Switch>
  </div>
</Router>

export default App;
