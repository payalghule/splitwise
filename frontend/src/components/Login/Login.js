/* eslint-disable */
import React, { Component } from 'react';
import logo from '../../images/logo.png';
import NavbarLogin from '../Layout/NavbarLogin';
import '../../App.css';

class Login extends Component {
  constructor(props) {
    super(props);
  }
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
                <form action="">
                  <div className="form-group">
                    <label htmlFor="">Email Address</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="text" className="form-control" />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Log in
                  </button>
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
