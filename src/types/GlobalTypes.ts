import { ActionType, StateType } from 'typesafe-actions';
import rootAction from '@/actions';
import rootReducer from '@/reducers';
// import { IHomeState } from '@/types/HomeTypes';
// import { RouterState } from 'connected-react-router';
// export interface RootState {
//   home: IHomeState;
//   router: RouterState;
// }
export type RootAction = ActionType<typeof rootAction>;
export type RootState = StateType<typeof rootReducer>;
export type Services = typeof import('@/apis').default;
