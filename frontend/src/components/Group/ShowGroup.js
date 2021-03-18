/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import NavbarDashBoard from '../Layout/NavbarDashboard';
import AddExpense from '../Expense/AddExpense';
import backendServer from '../../backEndConfig';
import expensepic from '../../images/explogo.png';
import axios from 'axios';
import '../../App.css';

//to show list of groups
class ShowGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupMembers: [],
      groupExpense: [],
    };
  }

  componentDidMount() {
    //to get the groupmembers
    const groupNameFromProps = this.props.match.params.groupName;
    this.setState({
      groupName: groupNameFromProps,
    });
    const groupData = { gName: groupNameFromProps };
    console.log('groupData: ', groupData);

    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/groups/getgroupmembs`, groupData)
      .then((response) => {
        console.log('response from Axios query', response.data);
        this.setState({
          groupMembers: this.state.groupMembers.concat(response.data),
        });
      })
      .catch((error) => {
        console.log('error occured while connecting to backend:', error);
      });

    //to get the group Expense details
    axios
      .post(`${backendServer}/groups/getgrpexpense`, groupData)
      .then((response) => {
        console.log('response from Axios query', response.data);
        this.setState({
          groupExpense: this.state.groupExpense.concat(response.data),
        });
      })
      .catch((error) => {
        console.log('error occured while connecting to backend:', error);
      });
  }
  render() {
    console.log(this.state.groupName);
    let gName = this.state.groupName;
    let groupExpense = this.state.groupExpense;
    return (
      <div className="dashboard">
        <NavbarDashBoard />
        <div className="container">
          <div className="row">
            <div className="col-sm-2"></div>

            <div className="col" id="dash-center">
              <div className="container">
                <div className="row dashheader">
                  <div className="col">
                    <h3>{gName}</h3>
                  </div>

                  <div className="col-sm-3">
                    <AddExpense groupData={this.state} />
                  </div>
                </div>
                <div>
                  {groupExpense.map((exp) => (
                    <div className="list-group">
                      <li className="list-group-item">
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1"></h5>
                          <small className="text-muted">{exp.date}</small>
                        </div>
                        <div className="row">
                          <div className="col">
                            <p className="mb-1">
                              <img
                                src={expensepic}
                                alt="Expense"
                                style={{ height: 'fit-content' }}
                              />
                              {exp.expDesc}
                            </p>

                            <div className="col">
                              {exp.paidbyUser} paid ${exp.amount}
                            </div>
                          </div>
                        </div>
                      </li>
                    </div>
                  ))}
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
