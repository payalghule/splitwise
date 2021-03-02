/* eslint-disable */
import React, { Component } from 'react';
import NavbarDashBoard from '../Layout/NavbarDashboard';
import '../../App.css';

class DashBoard extends Component {
  render() {
    return (
      <div className="dashboard">
        <NavbarDashBoard />
        <div className="container">
          <div className="row">
            <div className="col-sm-3" style={{ backgroundColor: 'lightblue' }}>
              left
            </div>

            <div className="col" id="dash-center">
              <div className="row dashheader">
                <h3>Dashboard </h3>
                <button className="btnsignup float-right">Settle up!</button>
              </div>

              <div className="row totalbalance">
                <div clasName="col bal-cell">
                  <label htmlFor="">total balance</label>
                  <p>$0.00</p>
                </div>

                <div clasName="col bal-cell">
                  <label htmlFor="">you owe</label>
                  <p>$0.00</p>
                </div>

                <div clasName="col bal-cell">
                  <label htmlFor="">you are owed</label>
                  <p>$0.00</p>
                </div>
              </div>

              <div className="row">
                <div clsssName="col">
                  <h4>YOU OWE</h4>
                </div>

                <div clsssName="col">
                  <h4>YOU ARE OWED</h4>
                </div>
              </div>
            </div>

            <div className="col-sm-3" style={{ backgroundColor: 'lightblue' }}>
              right
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
