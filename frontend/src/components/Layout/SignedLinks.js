/* eslint-disable */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from '../../redux/actions/loginAction';

class SignedLinks extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleLogout = () => {
    window.localStorage.clear();
    this.props.userLogout();
  };
  render() {
    return (
      <div>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <NavLink
              to="/"
              className="nav-link signup-nav-orange-button"
              onClick={this.props.userLogout}
            >
              Log Out
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/" className="nav-link login-nav-green-button">
              {this.props.user.username}
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.loginuser.user,
  };
};
export default connect(mapStateToProps, null)(SignedLinks);
