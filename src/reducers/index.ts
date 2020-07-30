import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import homeReducer from './homeReducer';

const rootReducer = (history: History) =>
  combineReducers({
    homeState: homeReducer,
    router: connectRouter(history),
  });

export default rootReducer;
