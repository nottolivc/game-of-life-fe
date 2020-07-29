import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
//import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../App.css";

const Login = (props) => {
  const [users, setUsers] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setUsers({
      ...users,
      [event.target.name]: event.target.value,
    });
  };

  const login = (event) => {
    event.preventDefault();
    // console.log("users", users);
    axios
      .post("https://murmuring-refuge-82582.herokuapp.com/auth/login", users)
      // {
      //   withCredentials: true,
      // })
      .then((result) => {
        console.log(result.data);
        localStorage.setItem("token", result.data.token);
        props.history.push("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          //   console.log(error.response.status);
          //   console.log(error.response.headers);
        } else {
          console.log("Error", error.message);
          alert(error);
        }
        console.log(error.config);
      });
  };

  return (
    <div className="login-form">
      <h2>Login Now</h2>

      <form
        onSubmit={login}
        className="login-form"
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="filled-required"
          name="username"
          label="Username"
          margin="normal"
          variant="filled"
          value={users.username}
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          name="password"
          margin="normal"
          variant="filled"
          value={users.password}
          onChange={handleChange}
        />
        <br />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          // className={classes.button}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;
