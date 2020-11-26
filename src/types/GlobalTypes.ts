import { ActionType, StateType } from 'typesafe-actions';
import rootAction from '@/actions';
import rootReducer from '@/reducers';

export type RootAction = ActionType<typeof rootAction>;
export type RootState = StateType<typeof rootReducer>;
export type Services = typeof import('@/apis').default;
