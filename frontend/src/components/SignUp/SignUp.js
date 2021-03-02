/* eslint-disable */
import React, { Component } from 'react';
import logo from '../../images/logo.png';
import '../../App.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container signup-div">
        <div className="row">
          <div className="col">
            <img src={logo} className="logo-signup" alt="logo" />
          </div>
          <div className="col">
            <div className="signup-block"></div>
            <h2>INTRODUCE YOURSELF</h2>
            <form action="">
              <div className="form-group">
                <label htmlFor="">Hi there! My name is</label>
                <input type="text" className="form-control" />
              </div>

              <div className="form-group">
                <label htmlFor="">
                  Here's my <strong>email address:</strong>
                </label>
                <input type="text" className="form-control" />
              </div>

              <div className="form-group">
                <label htmlFor="">
                  And here is my <strong>password:</strong>
                </label>
                <input type="text" className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary btnorgsign">
                Sign me up!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
