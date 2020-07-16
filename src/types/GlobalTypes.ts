import { ActionType } from 'typesafe-actions';
import rootAction from '@/actions';
import { IHomeState } from '@/reducers/homeReducer';
import { RouterState } from 'connected-react-router';

export type RootAction = ActionType<typeof rootAction>;
// export type RootState = StateType<typeof rootReducer>;

export interface RootState {
  router: RouterState;
  homeState: IHomeState;
}

export type Services = typeof import('@/apis').default;
