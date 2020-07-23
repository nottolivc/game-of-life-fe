import React from "react";
import { Redirect } from "react-router-dom";

function Logout(props) {
  // Nothing has to happen on the server to log out,
  // just delete the token
  localStorage.removeItem("token");

  return <Redirect to="/" />;
}
export default Logout;
