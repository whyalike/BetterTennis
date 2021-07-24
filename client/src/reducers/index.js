import {combineReducers} from 'redux'; // Root reducer
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
}); // Takes in any reducers we create
