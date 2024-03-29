/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import NavbarDashBoard from '../Layout/NavbarDashboard';
import LeftSidebar from '../Layout/LeftSidebar';
import backendServer from '../../backEndConfig';
import Settle from '../Expense/Settle';
import '../../App.css';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem('userid'),
      dashData: {},
    };
    this.getDashSummary = this.getDashSummary.bind(this);
  }

  componentDidMount() {
    const data = { userid: this.state.userId };
    console.log('userData : ', data);
    this.getDashSummary(data);
  }

  // removeSettleData = (expense) => {
  //   settleExpense = this.state.dashData.keyYouOwe;

  //   this.setState({
  //     settleExpense: update(this.state.dashData.keyYouOwe, {
  //       $unshift: [expense],
  //     }),
  //   });
  // };

  getDashSummary = (userData) => {
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/dashboard/getdashdata`, userData)
      .then((response) => {
        console.log('Data came from Axios call', response.data);
        this.setState({
          dashData: response.data,
        });
      })
      .catch((error) => {
        console.log('error occured while connecting to backend:', error);
      });
  };

  render() {
    let dashBoardData = this.state.dashData;
    console.log('dashBoardData: ', dashBoardData);
    let youAreOwed = this.state.dashData.keyYouAreOwed;
    console.log('youAreOwed: ', youAreOwed);
    let youOwed = this.state.dashData.keyYouOwe;
    console.log('youOwed: ', youOwed);

    let TotalOwe = 0;
    let TotalOwed = 0;
    if (youAreOwed && youAreOwed.length > 0) {
      for (let i = 0; i < youAreOwed.length; i++) {
        TotalOwed = TotalOwed + youAreOwed[i].pendingAmt;
      }
    }
    if (youOwed && youOwed.length > 0) {
      for (let i = 0; i < youOwed.length; i++) {
        TotalOwe = TotalOwe + youOwed[i].pendingAmt;
      }
    }
    let TotalBalance = TotalOwed - TotalOwe;
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
                    <Settle members={youOwed} />
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row totalbalance">
                  <div className="col-sm-4 bal-cell">
                    <label
                      htmlFor=""
                      style={{
                        fontSize: '16px',
                      }}
                    >
                      total balance
                    </label>
                    <div>
                      {TotalBalance < 0 ? (
                        <div
                          style={{
                            color: 'red',
                            fontSize: '21px',
                          }}
                        >
                          -$
                          {Math.abs(
                            (Math.round(TotalBalance * 100) / 100).toFixed(2)
                          )}
                        </div>
                      ) : (
                        <div
                          style={{
                            color: '#5bc5a7',
                            fontSize: '21px',
                          }}
                        >
                          +$
                          {Math.abs(
                            (Math.round(TotalBalance * 100) / 100).toFixed(2)
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-4 bal-cell">
                    <label
                      htmlFor=""
                      style={{
                        fontSize: '16px',
                      }}
                    >
                      you owe
                    </label>
                    <p>
                      <div
                        style={{
                          color: 'red',
                          fontSize: '21px',
                        }}
                      >
                        ${(Math.round(TotalOwe * 100) / 100).toFixed(2)}
                      </div>
                    </p>
                  </div>

                  <div className="col-sm-4 bal-cell">
                    <label
                      htmlFor=""
                      style={{
                        fontSize: '16px',
                      }}
                    >
                      you are owed
                    </label>
                    <p>
                      <div
                        style={{
                          color: '#5bc5a7',
                          fontSize: '21px',
                        }}
                      >
                        ${(Math.round(TotalOwed * 100) / 100).toFixed(2)}
                      </div>
                    </p>
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
                  <div className="row">
                    <div>
                      {youOwed && youOwed.length > 0 ? (
                        youOwed.map((blog) => (
                          <div
                            style={{
                              color: 'red',
                              fontSize: '18px',
                              fontWeight: 'bold',
                            }}
                          >
                            You owe {blog.payableTo} $
                            {(Math.round(blog.pendingAmt * 100) / 100).toFixed(
                              2
                            )}
                          </div>
                        ))
                      ) : (
                        <div style={{ color: 'black', fontSize: '18px' }}>
                          You do not owe anything
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col pos-bal">
                  <div className="row">
                    <div>
                      {youAreOwed && youAreOwed.length > 0 ? (
                        youAreOwed.map((blog) => (
                          <div
                            style={{
                              color: '#5bc5a7',
                              fontSize: '18px',
                              fontWeight: 'bold',
                            }}
                          >
                            {blog.borrower} owes $
                            {(Math.round(blog.pendingAmt * 100) / 100).toFixed(
                              2
                            )}
                          </div>
                        ))
                      ) : (
                        <div style={{ color: 'black', fontSize: '18px' }}>
                          You are not owed anything
                        </div>
                      )}
                    </div>
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

export default DashBoard;
