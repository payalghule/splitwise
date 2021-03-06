import { USER_SIGNUP } from './types';
import backendServer from '../../backEndConfig';
import axios from 'axios';

const userSignup = (signUpData) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios
    .post(`${backendServer}/SignUp/`, signUpData)
    .then((response) =>
      dispatch({
        type: USER_SIGNUP,
        payload: response.data,
      })
    )
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: USER_SIGNUP,
          payload: error.response.data,
        });
      }
    });
};

export default userSignup;
