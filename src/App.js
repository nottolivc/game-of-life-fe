import React from "react";
import Home from "./views/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Logout from "./components/Logout";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
//import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <div className="App">
      <div className="navlinks">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/logout">Logout</NavLink>
      </div>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/" component={Home} />
      <Route exact path="/logout" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/logout" component={Logout} />
    </div>
  );
};

export default App;
