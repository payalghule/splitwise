/* eslint-disable */
import React from 'react';
import logosplit from '../../images/logosplit.svg';
/*import DropDown from './DropDown';*/
import '../../App.css';
import SignedLinks from './SignedLinks';

const NavbarDashboard = () => {
  return (
    <nav className="navbar navbar-expand-lg navbarlogin">
      <div className="container-fluid">
        <div className="row">
          <img src={logosplit} className="logogreen" alt="logo" />
        </div>
        <SignedLinks />
      </div>
    </nav>
  );
};

export default NavbarDashboard;
