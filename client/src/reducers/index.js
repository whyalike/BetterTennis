import {combineReducers} from 'redux'; // Root reducer
import alert from './alert';

export default combineReducers({
  alert,
}); // Takes in any reducers we create
