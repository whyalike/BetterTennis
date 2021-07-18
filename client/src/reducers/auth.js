/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */
import {REGISTER_SUCCESS, REGISTER_FAIL} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null, // Check if authenticated
  loading: true, // Make sure loading is finished
  user: null, // User data
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
