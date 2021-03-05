/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { userLogin } from '../../redux/actions/loginAction';
import PropTypes from 'prop-types';
import logo from '../../images/logo.png';
import NavbarLogin from '../Layout/NavbarLogin';

import '../../App.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    console.log('Client Log: In Login');

    const loginData = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(loginData);
    this.props.userLogin(loginData);
    this.setState({
      loginFlag: 1,
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
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      onChange={this.onChange}
                    />
                  </div>
                  <button type="submit" className="login-orange-button">
                    Log in
                  </button>
                  <div>Some Message need to put here</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.loginuser.user,
  };
};

export default connect(mapStateToProps, { userLogin })(Login);
