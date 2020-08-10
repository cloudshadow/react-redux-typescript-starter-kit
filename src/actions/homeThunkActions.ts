// payload: Optional. Any value or object containing data related to the action.
// meta: Optional. Any value or object containing data that isn’t part of the payload.
// import { createAction, createStandardAction } from 'typesafe-actions';
import { IHomeState } from '@/types/HomeTypes';

export const GET_HOME_TITLE = 'GET_HOME_TITLE';
export const getTitleAction = (title: IHomeState) => {
  return {
    type: GET_HOME_TITLE,
    payload: title,
  };
};

export const DEL_HOME_TITLE = 'DEL_HOME_TITLE';
export const delTitleAction = (id: number) => {
  return {
    type: DEL_HOME_TITLE,
    meta: {
      id,
    },
  };
};

interface IGetTitleAction {
  type: typeof GET_HOME_TITLE; // same as type: string
  payload: IHomeState;
}

// Just for Demo
interface IDelTitleAction {
  type: typeof DEL_HOME_TITLE;
  meta: {
    title: string;
  };
}
export const homeThunkActions = {
  getTitleAction,
  delTitleAction,
};
export type HomeActionTypes = IGetTitleAction | IDelTitleAction;
