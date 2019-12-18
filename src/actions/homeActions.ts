import { createAsyncAction, createAction } from 'typesafe-actions';
import { ITitle } from '../types/HomeTypes';

export const homeActions = {
  fetchTitleEpicAsync: createAsyncAction(
    'FETCH_HOME_TITLE_EPIC_REQUEST',
    'FETCH_HOME_TITLE_EPIC_SUCCESS',
    'FETCH_HOME_TITLE_EPIC_FAILURE',
  )<void, ITitle, Error>(),
  fetchTitleThunk: createAction('FETCH_HOME_TITLE_THUNK_SUCCESS', action => {
    return (title: ITitle) => action(title);
  })
};