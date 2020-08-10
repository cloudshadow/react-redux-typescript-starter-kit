import { createAsyncAction, createAction } from 'typesafe-actions';
import { ITemplateState } from '@tempPath/types/TemplateTypes';

export const templateActions = {
  fetchEpicAsync: createAsyncAction(
    'FETCH_TEMPLATE_EPIC_REQUEST',
    'FETCH_TEMPLATE_EPIC_SUCCESS',
    'FETCH_TEMPLATE_EPIC_FAILURE'
  )<void, ITemplateState, Error>(),
  fetchThunk: createAction('FETCH_TEMPLATE_THUNK_SUCCESS')<ITemplateState>(),
};
