/* eslint-disable */
import React from 'react';
import {Link} from 'react-router-dom';
import "../App.css"

const Navbar= () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
        <a className="navbar-brand appname"><h1>Splitwise</h1></a>
        <ul className="nav navbar-nav navbar-right">   
        <li><Link to="/Login" className="btnlogin">Login</Link></li>
          <li><Link to="/SignUp" className="btnsignup">Sign up</Link></li>
        </ul>
        </div>
      </nav>
  )
}

export default Navbar;
