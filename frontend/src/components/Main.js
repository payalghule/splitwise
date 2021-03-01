/* eslint-disable */
import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './Landing/Landing';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import DashBoard from './DashBoard/DashBoard';

const Main = () => {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/Login" component={Login} />
      <Route path="/DashBoard" component={DashBoard} />
    </div>
  );
};

export default Main;
