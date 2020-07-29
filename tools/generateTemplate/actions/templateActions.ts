import { createAsyncAction, createAction } from 'typesafe-actions';
import { ITemp } from '@tempPath/types/TemplateTypes';

export const templateActions = {
  fetchEpicAsync: createAsyncAction(
    'FETCH_TEMPLATE_EPIC_REQUEST',
    'FETCH_TEMPLATE_EPIC_SUCCESS',
    'FETCH_TEMPLATE_EPIC_FAILURE'
  )<void, ITemp, Error>(),
  fetchThunk: createAction('FETCH_TEMPLATE_THUNK_SUCCESS')<ITemp>(),
};
