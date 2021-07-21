import {combineReducers} from 'redux'; // Root reducer
import alert from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({
  alert,
  auth,
  profile,
}); // Takes in any reducers we create
