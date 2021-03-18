/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import NavbarDashBoard from '../Layout/NavbarDashboard';
import LeftSidebar from '../Layout/LeftSidebar';
import backendServer from '../../backEndConfig';
import '../../App.css';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem('userid'),
      dashData: [],
    };
  }

  componentDidMount() {
    const userData = { userid: this.state.userId };
    console.log('userData : ', userData);
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/dashboard/getdashdata`, userData)
      .then((response) => {
        console.log('data is', response.data);
        this.setState({
          dashData: this.state.dashData.concat(response.data),
        });
      })
      .catch((error) => {
        console.log('error occured while connecting to backend:', error);
      });
  }

  render() {
    return (
      <div className="dashboard">
        <NavbarDashBoard />
        <div className="container">
          <div className="row">
            <div className="col-sm-2">
              <LeftSidebar />
            </div>

            <div className="col" id="dash-center">
              <div className="container dashContainer">
                <div className="row dashheader align-items-center">
                  <div className="col-sm-3">
                    <h3>Dashboard </h3>
                  </div>
                  <div className="col-sm-3"></div>
                  <div className="col-sm-3"></div>
                  <div className="col-sm-3">
                    <button className="green-button">Settle up!</button>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row totalbalance">
                  <div className="col-sm-4 bal-cell">
                    <label htmlFor="">total balance</label>
                    <p>$0.00</p>
                  </div>

                  <div className="col-sm-4 bal-cell">
                    <label htmlFor="">you owe</label>
                    <p>$0.00</p>
                  </div>

                  <div className="col-sm-4 bal-cell">
                    <label htmlFor="">you are owed</label>
                    <p>$0.00</p>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col">
                    <h4 className="expheader-lt">YOU OWE</h4>
                  </div>

                  <div className="col">
                    <h4 className="expheader-rt">YOU ARE OWED</h4>
                  </div>
                </div>
              </div>

              <div className="row summary">
                <div className="col neg-bal">
                  <div className="row">You owe this much USD</div>
                </div>

                <div className="col pos-bal">
                  <div className="row">You are owed this much USD</div>
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

export default DashBoard;
