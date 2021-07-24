import axios from 'axios';
import {setAlert} from './alert';
import {
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from './types';

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

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Send a request, receive a response
    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      // Handles displaying the profile to the user
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('./dashboard');
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

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Send a request, receive a response
    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      // Handles displaying the profile to the user
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('./dashboard');
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

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    console.log('oh');
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// Delete account & profile
// Delete experience
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone')) {
    try {
      const res = await axios.delete('/api/profile');

      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status},
      });
    }
  }
};
