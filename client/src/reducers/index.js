import {combineReducers} from 'redux'; // Root reducer
import alert from './alert';
import auth from './auth';

export default combineReducers({
  alert,
  auth,
}); // Takes in any reducers we create
