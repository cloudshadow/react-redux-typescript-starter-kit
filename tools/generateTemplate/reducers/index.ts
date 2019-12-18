import { combineReducers } from 'redux';
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'
import templateState, { ITemplateState } from './tempReducer';

export interface IAppState {
  templateState: ITemplateState;
  router: RouterState;
}

const rootReducer = (history: History) => combineReducers({
  templateState,
  router: connectRouter(history)
})

export default rootReducer;
