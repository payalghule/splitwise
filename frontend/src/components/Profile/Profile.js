/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import profilepic from '../../images/profilepic.PNG';
import NavbarDashBoard from '../Layout/NavbarDashboard';
import '../../App.css';

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container-fluid">
        <NavbarDashBoard />
        <div className="container profile-div">
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
              <form action="">
                <div className="form-group">
                  <label htmlFor="username">Your name</label>
                  <input
                    type="text"
                    className="form-control"
                    name=""
                    id="username"
                    defaultValue={this.props.user.username}
                  />
                  <a href="#" id="show">
                    edit
                  </a>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your email address</label>
                  <input
                    type="text"
                    name=""
                    className="form-control"
                    id="email"
                    defaultValue={this.props.user.email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Your phone number</label>
                  <input
                    type="text"
                    name=""
                    className="form-control"
                    id="phone"
                    defaultValue={this.props.user.phone}
                  />
                </div>
              </form>
            </div>

            <div className="col">
              <div className="signup-block">
                <form action="">
                  <div className="form-group">
                    <label htmlFor="">Your Default currency</label>
                    <br />
                    <label htmlFor="">
                      <small>(for new expenses)</small>
                    </label>
                    <select
                      name="currency"
                      className="form-control"
                      defaultValue={this.props.user.currency}
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
                      defaultValue={this.props.user.timezone}
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
                      defaultValue={this.props.user.language}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>
                  <button className="btn btn-primary">Save</button>
                </form>
              </div>
            </div>
          </div>
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
