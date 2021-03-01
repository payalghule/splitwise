/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import '../../App.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <row>
          <img src={logo} className="logo" alt="logo" />
          <a className="navbar-brand appname">Splitwise</a>
        </row>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/Login" className="btnlogin">
              Login
            </Link>
          </li>
          <li>
            <Link to="/SignUp" className="btnsignup">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
