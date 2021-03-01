/* eslint-disable */
import React from 'react';
import {Route} from 'react-router-dom';
import Landing from './Landing';

const Main = () =>{
        return(
            <div>
                <Route  path="/" component={Landing}/>

            </div>
        );
    }

export default Main;
