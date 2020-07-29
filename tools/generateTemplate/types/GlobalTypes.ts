import { ActionType } from 'typesafe-actions';
import rootAction from '@tempPath/actions';
import { ITemplateState } from '@tempPath/reducers/tempReducer';
import { RouterState } from 'connected-react-router';

export type RootAction = ActionType<typeof rootAction>;

export interface RootState {
  router: RouterState;
  templateState: ITemplateState;
}

export type Services = typeof import('@tempPath/apis').default;
