/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import logogreen from '../../images/logogreen.png';
import '../../App.css';

const NavbarLogin = () => {
  return (
    <nav className="navbar navbar-expand-lg navbarlogin">
      <div className="container">
        <row>
          <img src={logogreen} className="logogreen" alt="logo" />
          <a className="navbar-brand">Splitwise</a>
        </row>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/Login" className="btn btngreen">
              Login
            </Link>
          </li>
          <li>or</li>
          <li>
            <Link to="/SignUp" className="btn  btn-primary ">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarLogin;
