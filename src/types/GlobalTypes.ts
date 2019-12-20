import { ActionType } from "typesafe-actions";
import rootAction from '@/actions';

export type Services = typeof import('@/apis').default;
export type RootAction = ActionType<typeof rootAction>