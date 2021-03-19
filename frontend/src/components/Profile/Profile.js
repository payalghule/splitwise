/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import profilepic from '../../images/profilepic.PNG';
import NavbarDashBoard from '../Layout/NavbarDashboard';
import backendServer from '../../backEndConfig';
import axios from 'axios';
import '../../App.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      phone: this.props.user.phone,
      currency: this.props.user.currency,
      timezone: this.props.user.timezone,
      language: this.props.user.language,
      isUpdated: 0,
      profileData: [],
      userId: localStorage.getItem('userid'),
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.getUserProfile = this.getUserProfile.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // componentDidMount() {
  //   const user = { userId: this.state.userId };
  //   console.log('current user ID: ', user);
  //    this.getUserProfile(user);
  // }

  // getUserProfile = (user) => {
  //   axios.defaults.withCredentials = true;
  //   axios
  //     .post(`${backendServer}/profile/getuserprofile`, user)
  //     .then((response) => {
  //       console.log('Profile Data received from axios', response.data);
  //       this.setState({
  //         profileData: this.state.profileData.concat(response.data),
  //       });
  //     })
  //     .catch((error) => {
  //       console.log('error occured while connecting to backend:', error);
  //     });
  // };
  onSubmit = (e) => {
    e.preventDefault();
    const userid = localStorage.getItem('userid');
    const updatedData = {
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      currency: this.state.currency,
      timezone: this.state.timezone,
      language: this.state.language,
      userid: userid,
    };
    console.log('userid', userid);
    console.log('this  Data: ', updatedData);

    axios.defaults.withCredentials = true;
    axios
      .post('http://localhost:3001/profile', updatedData)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          alert('Profile details updated Successfully');
          this.setState({
            isUpdated: 1,
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    let redirectVar = null;
    if (this.state.isUpdated === 1) {
      redirectVar = <Redirect to="/DashBoard" />;
    }
    return (
      <div className="container-fluid">
        {redirectVar}
        <NavbarDashBoard />
        <div className="container profile-div">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col">
                <img src={profilepic} className="" alt="profilepic" />
                <div>
                  <label htmlFor="browse">Change your avatar</label>
                  <input
                    type="file"
                    id="profileimg"
                    name="profileimg"
                    accept="image/*"
                  ></input>
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label htmlFor="username">Your name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    onChange={this.onChange}
                    defaultValue={this.state.username}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your email address</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    id="email"
                    onChange={this.onChange}
                    defaultValue={this.state.email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Your phone number</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    id="phone"
                    onChange={this.onChange}
                    defaultValue={this.state.phone}
                  />
                </div>
              </div>

              <div className="col">
                <div className="signup-block">
                  <div className="form-group">
                    <label htmlFor="">Your Default currency</label>
                    <br />
                    <select
                      name="currency"
                      className="form-control"
                      defaultValue={this.state.currency}
                      onChange={this.onChange}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="HUF">HUF</option>
                      <option value="HUF">INR</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">You timezone</label>
                    <select
                      name="timezone"
                      className="form-control"
                      defaultValue={this.state.timezone}
                      onChange={this.onChange}
                    >
                      <option value="(GMT-08:00) Pacific Time">
                        (GMT-08:00) Pacific Time
                      </option>
                      <option value="(GMT-06:00) Central America">
                        (GMT-06:00) Central America
                      </option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Language</label>
                    <select
                      name="language"
                      className="form-control"
                      defaultValue={this.state.language}
                      onChange={this.onChange}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>
                  <button type="submit" className="green-button float-right">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.loginuser.user,
  };
};
export default connect(mapStateToProps, null)(Profile);
