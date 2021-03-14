/* eslint-disable */
import React, { Component } from 'react';
import logo from '../../images/logo.png';
import backendServer from '../../backEndConfig';
import axios from 'axios';
import { Multiselect } from 'multiselect-react-dropdown';
import '../../App.css';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      selectedMembers: [],
      groupName: '',
      selectedValue: [
        {
          id: localStorage.getItem('userid'),
          username: localStorage.getItem('username'),
          email: localStorage.getItem('email'),
        },
      ],
    };
  }

  onSelect = (data) => {
    this.setState({
      selectedMembers: data,
    });
    console.log('selected', this.state.selectedMembers);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userid = localStorage.getItem('userid');
    const email = localStorage.getItem('email');
    let getEmailArray = [];
    const listOfMembers = this.state.selectedMembers;
    for (var i = 0; i < listOfMembers.length; i++) {
      getEmailArray[i] = listOfMembers[i].email;
    }
    console.log(getEmailArray);

    const newGroupData = {
      groupName: this.state.groupName,
      groupMembers: getEmailArray,
      groupCreatedby: email,
    };
    console.log('Data sending to server from Create Group page:', newGroupData);

    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/groups/creategroup`, newGroupData)
      .then((response) => {
        console.log('data is', response.data);
      })
      .catch((error) => {
        console.log('error occured while connecting to backend:', error);
      });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;
    axios
      .get(`${backendServer}/groups/getUser`)
      .then((response) => {
        console.log('data is', response.data);
        this.setState({
          userData: this.state.userData.concat(response.data),
        });
      })
      .catch((error) => {
        console.log('error occured while connecting to backend:', error);
      });
  }
  render() {
    let details = this.state.userData;
    return (
      <div className="container signup-div">
        <div className="row">
          <div className="col">
            <img src={logo} className="logo-signup" alt="logo" />
            <div>
              <label htmlFor="browse"></label>
              <input
                type="file"
                id="profileimg"
                name="profileimg"
                accept="image/*"
                className="browse-grouppic"
              ></input>
            </div>
          </div>
          <div className="col">
            <div className="signup-block">
              <h2>START A NEW GROUP</h2>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="">My group shall be called</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Group Name"
                    name="groupName"
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <h3>ADD GROUP MEMBERS</h3>

                  <Multiselect
                    options={details} // Options to display in the dropdown
                    selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                    onSelect={this.onSelect}
                    displayValue="username"
                    placeholder="Select Group Members" // Property name to display in the dropdown options
                  />
                </div>

                <button type="submit" className="btn btn-primary btnorgsign">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Group;
