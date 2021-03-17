/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import NavbarDashBoard from '../Layout/NavbarDashboard';
import AddExpense from '../Expense/AddExpense';
import backendServer from '../../backEndConfig';
import axios from 'axios';
import '../../App.css';
//to show list of groups
class ShowGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupMembers: [],
    };
  }

  componentDidMount() {
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
  }
  render() {
    console.log(this.state.groupName);
    let gName = this.state.groupName;
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
