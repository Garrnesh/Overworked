import React, { useState } from "react";
import useFetch from "./useFetch";
import axios from "axios";

import { auth } from "./Config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import Card from 'react-bootstrap/Card';

// import logo from './thriftitlogo.png';
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [message, setMessage] = useState(null);

  const errors = {
    wrongCredentials: "Incorrect username or password",
    noUsername: "Please enter your username",
    noPassword: "Please enter your password",
  };

  const handleSubmit = (e) => {
    // Prevent page from reloading
    e.preventDefault();

    if (!username) {
      // Username input is empty
      setErrorMessages({ name: "noUsername", message: errors.noUsername });
      return;
    }

    if (!password) {
      // Password input is empty
      setErrorMessages({ name: "noPassword", message: errors.noPassword });
      return;
    }

    // Log in user
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return user.getIdToken(false)
      })
      .then((idToken) => {
            return axios.get(
                "http://localhost:8000/business",
                { headers: {
                    "Content-Type": "application/json",
                    "idtoken": idToken } }
            )
      })
      .then((response) => {
          return response.data.userName;
      })
      .then((username) => {
        localStorage.setItem("authenticated", true);
        localStorage.setItem("username", username);
        navigate("/viewlisting");
      })
      .catch((error) => {
        setErrorMessages({ name: "wrongCredentials", message: errors.wrongCredentials });
        setMessage("Invalid email or password");
        console.log(error);
      });
    return;
  };

  // Render error messages
  const renderErrorMsg = (name) =>
    name === errorMessages.name && (
      <p className="error_msg">{errorMessages.message}</p>
    );

  return (
    <Card>
      {/* <img src = {logo} /> */}
      {/* <h1 className="title"><img src={logo} className="img-responsive" height="144" /></h1> */}
      <h1 className="title">Welcome to ThriftIt</h1>
      <h1 className="subtitle">Sign in to ThriftIt</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputs_container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {renderErrorMsg("username")}
          {renderErrorMsg("noUsername")}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          {renderErrorMsg("password")}
          {renderErrorMsg("noPassword")}
          { message && <div className="error">{message}</div>}
        </div>
        <input type="submit" value="Log In" className="login_button" />
      </form>
      <div className="link_container">
        <Link to="/bizsignup" className="btn btn-outline-primary mb-2 col-7">New to ThriftIt? Sign up here</Link>
      </div>
      {/* <div className="icons">
        <GoogleIcon className="icon" />
        <FacebookIcon className="icon" />
        <TwitterIcon className="icon" />
      </div> */}
    </Card>
  );
};

export default LoginForm;

