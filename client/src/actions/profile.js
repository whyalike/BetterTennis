import axios from 'axios';

import {GET_PROFILE, PROFILE_ERROR} from './types';

// Get the current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('./api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data, // res.data gives all the data from the response
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
