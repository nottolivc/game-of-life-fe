import React from "react";
// import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Dashboard from "./components/Dashboard";
import { Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

const AppRouter = () => (
  <Switch>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
  </Switch>
);

export default AppRouter;
