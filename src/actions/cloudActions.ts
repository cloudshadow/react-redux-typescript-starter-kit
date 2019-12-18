/* tslint:disable */
import { createAsyncAction, createAction } from 'typesafe-actions';
import { ITemp } from '../types/CloudTypes';

export const cloudActions = {
  fetchEpicAsync: createAsyncAction(
    'FETCH_EPIC_REQUEST',
    'FETCH_EPIC_SUCCESS',
    'FETCH_EPIC_FAILURE',
  )<void, ITemp, Error>(),
  fetchThunk: createAction('FETCH_THUNK_SUCCESS', action => {
    return (temp: ITemp) => action(temp);
  })
};