import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
//import signUpReducer from './signUpReducer';

const rootReducer = combineReducers({
  loginuser: loginReducer,
  //signupuser: signUpReducer,
});

export default rootReducer;
