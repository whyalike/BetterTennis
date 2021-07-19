import axios from 'axios';

// So that when we have a token, we're going to use that for every request
// Instead of picking and choosing

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
