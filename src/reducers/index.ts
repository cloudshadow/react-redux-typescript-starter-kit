import { combineReducers } from 'redux';
import home from './homeReducer';

const rootReducer = combineReducers({
  home,
});

export default rootReducer;
