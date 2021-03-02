/* eslint-disable */
import React, { Component } from 'react';
import logo from '../../images/logo.png';
import '../../App.css';

class Group extends Component {
  constructor(props) {
    super(props);
  }
  render() {
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
              <form action="">
                <div className="form-group">
                  <label htmlFor="">My group shall be called</label>
                  <input type="text" className="form-control" />
                </div>

                <div className="form-group">
                  <h3>GROUP MEMBERS</h3>
                  <div className="input-group">
                    <input
                      type="text"
                      className="input-sm"
                      placeholder="Name"
                      size="10"
                    />
                    <span
                      class="input-group-btn"
                      style={{ width: '10px' }}
                    ></span>
                    <input
                      type="text"
                      className="input-sm"
                      placeholder="Email Address"
                      size="25"
                    />
                  </div>
                  <br />
                  <div className="input-group">
                    <input
                      type="text"
                      className="input-sm"
                      placeholder="Name"
                      size="10"
                    />
                    <span
                      class="input-group-btn"
                      style={{ width: '10px' }}
                    ></span>
                    <input
                      type="text"
                      className="input-sm"
                      placeholder="Email Address"
                      size="25"
                    />
                  </div>
                </div>
                <a href="#" id="add">
                  + Add a person
                </a>
                <br />

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
