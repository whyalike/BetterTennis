import axios from 'axios';
import {setAlert} from './alert';
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

// Create or update profile
// formData: Data from the form
// history: Has a method called push which redirects us to client-side route
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Send a request, receive a response
      const res = await axios.post('/api/profile', formData, config);

      dispatch({
        // Handles displaying the profile to the user
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      // If we are not editing
      if (!edit) {
        history.push('./dashboard');
      }
    } catch (err) {
      // To make sure we're not missing any fields
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status},
      });
    }
  };
