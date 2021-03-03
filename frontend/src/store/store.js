import authReducer from '../reducers/authReducer';
import { createStore } from 'redux';

const store = createStore(authReducer);

export default store;
