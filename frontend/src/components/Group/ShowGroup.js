/* eslint-disable */
import React, { Component } from 'react';
import NavbarDashBoard from '../Layout/NavbarDashboard';
import '../../App.css';
//to show list of groups
class ShowGroup extends Component {
  render() {
    return (
      <div className="dashboard">
        <NavbarDashBoard />
        <div className="container">
          <div className="row">
            <div className="col-sm-2"></div>

            <div className="col" id="dash-center">
              <div className="container">
                <div className="row dashheader align-items-center">
                  <div className="col">
                    <h3>Group Name</h3>
                  </div>

                  <div className="col-sm-3">
                    <button className="orange-button">Add an expense </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowGroup;
