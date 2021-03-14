/* eslint-disable */
import React, { Component } from 'react';
import NavbarDashBoard from '../Layout/NavbarDashboard';
import backendServer from '../../backEndConfig';
import axios from 'axios';
import '../../App.css';
//to show list of groups
class MyGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allGroupNames: [],
      userEmail: localStorage.getItem('email'),
    };
  }
  componentDidMount() {
    const memData = { groupMember: this.state.userEmail };
    console.log('Member Data : ', memData);
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/groups/getallgroups`, memData)
      .then((response) => {
        console.log('data is', response.data);
        this.setState({
          allGroupNames: this.state.allGroupNames.concat(response.data),
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
            <div className="col-sm-2"></div>

            <div className="col" id="dash-center">
              <div className="container">
                <div className="row dashheader align-items-center">
                  <div className="col">
                    <h3>My Groups</h3>
                  </div>
                  <div className="col">
                    <form className="form-inline my-2 my-lg-0">
                      <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                      >
                        Search
                      </button>
                    </form>
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

export default MyGroups;
