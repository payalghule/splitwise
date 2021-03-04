/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../images/logo.png';
import '../../App.css';

function SignUp() {
  const [usernameSign, setUsernameSign] = useState('');
  const [emailSign, setEmailSign] = useState('');
  const [passwordSign, setPasswordSign] = useState('');

  const handleSignUp = (e) => {
    // e.preventDefault();
    console.log('In handleSignUp');
    axios
      .post('http://localhost:3001/SignUp', {
        username: usernameSign,
        email: emailSign,
        password: passwordSign,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="container signup-div">
      <div className="row">
        <div className="col">
          <img src={logo} className="logo-signup" alt="logo" />
        </div>
        <div className="col">
          <div className="signup-block"></div>
          <h2>INTRODUCE YOURSELF</h2>
          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="username">Hi there! My name is</label>
              <input
                type="text"
                id="username"
                className="form-control"
                onChange={(e) => {
                  setUsernameSign(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Here's my <strong>email address:</strong>
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                onChange={(e) => {
                  setEmailSign(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                And here is my <strong>password:</strong>
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                onChange={(e) => {
                  setPasswordSign(e.target.value);
                }}
              />
            </div>
            <button className="login-orange-button">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
