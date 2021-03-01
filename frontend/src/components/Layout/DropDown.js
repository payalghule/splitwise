/* eslint-disable */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import '../../App.css';

const DropDown = () => {
  return (
    <div>
      <DropdownButton id="btndropdown" title="UserName">
        <Dropdown.Item href="#/action-1">Your Account</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Create a group</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Log out</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default DropDown;
