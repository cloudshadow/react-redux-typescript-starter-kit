import { deprecated, createAsyncAction } from 'typesafe-actions';
import { ICloudState } from '@/types/CloudTypes';

const { createStandardAction } = deprecated;

export const cloudActions = {
  fetchEpicAsync: createAsyncAction(
    'FETCH_EPIC_REQUEST',
    'FETCH_EPIC_SUCCESS',
    'FETCH_EPIC_FAILURE',
  )<void, ICloudState, Error>(),
  fetchThunk: createStandardAction('FETCH_THUNK_SUCCESS')<ICloudState>()
};