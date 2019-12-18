import { combineReducers } from 'redux';
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'
import homeState, { IHomeState } from './homeReducer';
import cloudState, { ICloudState } from './cloudReducer';

export interface IAppState {
  homeState: IHomeState;
  cloudState: ICloudState;
  router: RouterState;
}

const rootReducer = (history: History) => combineReducers({
  homeState,
  cloudState,
  router: connectRouter(history)
})

export default rootReducer;
