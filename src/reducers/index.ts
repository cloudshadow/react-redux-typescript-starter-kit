import { combineReducers } from 'redux';
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'
import homeReducer, { IHomeState } from './homeReducer';
import cloudReducer from './cloudReducer';
import { ICloudState } from '@/types/CloudTypes';

export interface IAppState {
  homeState: IHomeState;
  cloudState: ICloudState;
  router: RouterState;
}

const rootReducer = (history: History) => combineReducers({
  homeState: homeReducer,
  cloudState: cloudReducer,
  router: connectRouter(history)
})

export default rootReducer;
