/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavbarDashBoard from '../Layout/NavbarDashboard';
import LeftSidebar from '../Layout/LeftSidebar';
import backendServer from '../../backEndConfig';
import axios from 'axios';
import '../../App.css';
//to show list of groups
class MyGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allGroupNames: [],
      userId: localStorage.getItem('userid'),
    };
  }
  //To get the all  groups where user is member of those groups
  componentDidMount() {
    const memData = { groupMember: this.state.userId };
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

  //to change the isAccepted status true
  onJoinClick = (gName) => {
    console.log(gName);
    const groupData = { groupName: gName, groupMember: this.state.userId };
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/groups/joingroup`, groupData)
      .then((response) => {
        console.log('Response after Axios call', response);
        if (response.status == 200 && response.data === 'JOINED_GROUP') {
          alert('Joined group successfully!');
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log('error occured while connecting to backend:', error);
      });
  };
  render() {
    let groupList = this.state.allGroupNames;
    return (
      <div className="dashboard">
        <NavbarDashBoard />
        <div className="container">
          <div className="row">
            <div className="col-sm-2">
              <LeftSidebar />
            </div>

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
                <div>
                  {groupList.map((group) =>
                    group.isAccepted === 'False' ? (
                      <div
                        className="list-group list-group-horizontal"
                        key={group.groupName}
                      >
                        <Link
                          className="list-group-item list-group-item-action disabled"
                          style={{ width: '80%', marginRight: '10px' }}
                          to={`/groups/${group.groupName}`}
                        >
                          {group.groupName}
                        </Link>

                        <span>
                          <button
                            className="green-button"
                            onClick={() => this.onJoinClick(group.groupName)}
                          >
                            Join Group
                          </button>
                        </span>
                      </div>
                    ) : (
                      <div
                        className="list-group list-group-horizontal"
                        key={group.groupName}
                      >
                        <Link
                          className="list-group-item list-group-item-action"
                          style={{ width: '80%', marginRight: '10px' }}
                          to={`/groups/${group.groupName}`}
                        >
                          {group.groupName}
                        </Link>
                      </div>
                    )
                  )}
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
