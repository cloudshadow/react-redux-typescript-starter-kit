import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';
import { ITemplateState } from '@tempPath/types/TemplateTypes';
import template from './tempReducer';

export interface IAppState {
  template: ITemplateState;
  router: RouterState;
}

const rootReducer = (history: History) =>
  combineReducers({
    template,
    router: connectRouter(history),
  });

export default rootReducer;
