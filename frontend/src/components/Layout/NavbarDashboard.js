/* eslint-disable */
import React from 'react';
import logogreen from '../../images/logogreen.png';
import DropDown from './DropDown';
import '../../App.css';
import { Dropdown } from 'bootstrap';

const NavbarDashboard = () => {
  return (
    <nav className="navbar navbar-expand-lg navbarlogin">
      <div className="container">
        <row>
          <img src={logogreen} className="logogreen" alt="logo" />
          <a className="navbar-brand appname">Splitwise</a>
        </row>
        <DropDown />
      </div>
    </nav>
  );
};

export default NavbarDashboard;
