/* eslint-disable */
import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedLinks = () => {
  return (
    <div>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Log Out
          </NavLink>
        </li>
        <li classname="nav-item">
          <NavLink to="/" className="nav-link btn">
            UserName
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SignedLinks;
