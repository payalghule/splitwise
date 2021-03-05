/* eslint-disable */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const SignedLinks = (props) => {
  return (
    <div>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <NavLink
            to="/"
            className="nav-link signup-nav-orange-button"
            onClick={props.userLogout}
          >
            Log Out
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link login-nav-green-button">
            {props.user.username}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loginuser.user,
  };
};
export default connect(mapStateToProps, null)(SignedLinks);
