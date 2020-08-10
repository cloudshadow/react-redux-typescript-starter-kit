import { deprecated, createAsyncAction } from 'typesafe-actions';
import { IHomeState } from '@/types/HomeTypes';

const { createAction } = deprecated;

export const homeActions = {
  fetchTitleEpicAsync: createAsyncAction(
    'FETCH_HOME_TITLE_EPIC_REQUEST',
    'FETCH_HOME_TITLE_EPIC_SUCCESS',
    'FETCH_HOME_TITLE_EPIC_FAILURE'
  )<void, IHomeState, Error>(),
  fetchTitleThunk: createAction('FETCH_HOME_TITLE_THUNK_SUCCESS', (action) => {
    return (title: IHomeState) => action(title);
  }),
};
