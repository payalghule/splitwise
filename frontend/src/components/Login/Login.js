/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import logo from '../../images/logo.png';
import NavbarLogin from '../Layout/NavbarLogin';
import '../../App.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginMsg: '',
    };
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log('Client Log: In Login');
    console.log(this.state);
    axios
      .post('http://localhost:3001/Login', {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        //on successful login response contains user data
        if (response.data.message) {
          this.setState({
            loginMsg: response.data.message,
          });
        } else {
          this.setState({
            loginMsg: response.data[0].username,
          });
        }
      });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <NavbarLogin />
        <div className="container login-div">
          <div className="row">
            <div className="col">
              <img src={logo} className="logo-login" alt="logo" />
            </div>
            <div className="col">
              <div className="signup-block">
                <h2>WELCOME TO SPLITWISE</h2>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      onChange={this.emailChangeHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      onChange={this.passwordChangeHandler}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Log in
                  </button>
                  <h1>{this.state.loginMsg}</h1>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
