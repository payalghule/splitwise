import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import userProfileReducer from './userProfileReducer';

const rootReducer = combineReducers({
  loginuser: loginReducer,
  userProfile: userProfileReducer,
});

export default rootReducer;
