import { PayloadAction } from 'typesafe-actions';
import { IHomeState } from '@/types/HomeTypes';
import { homeActions } from '@/actions/homeActions';

describe('homeActions', () => {
  describe('fetchTitleEpicAsync', () => {
    it('homeActions.fetchTitleEpicAsync.request', () => {
      const expectedAction: PayloadAction<string, undefined> = {
        type: 'FETCH_HOME_TITLE_EPIC_REQUEST',
        payload: undefined,
      };
      expect(homeActions.fetchTitleEpicAsync.request()).toEqual(expectedAction);
    });

    it('homeActions.fetchTitleEpicAsync.success', () => {
      const data = { id: 1, title: 'title1', epicTitle: 'epicTitle2', loading: false, error: false };
      const expectedAction: PayloadAction<string, IHomeState> = {
        type: 'FETCH_HOME_TITLE_EPIC_SUCCESS',
        payload: data,
      };
      expect(homeActions.fetchTitleEpicAsync.success(data)).toEqual(expectedAction);
    });

    it('homeActions.fetchTitleEpicAsync.failure', () => {
      const error: Error = { name: 'errorName', message: 'Something went wrong' };
      const expectedAction: PayloadAction<string, Error> = {
        type: 'FETCH_HOME_TITLE_EPIC_FAILURE',
        payload: error,
      };
      expect(homeActions.fetchTitleEpicAsync.failure(error)).toEqual(expectedAction);
    });
  });
  describe('fetchTitleThunk', () => {
    const title = { id: 1, title: 'title1', epicTitle: 'epicTitle2', loading: false, error: false };
    it('homeActions.fetchTitleThunk', () => {
      const expectedAction: PayloadAction<string, IHomeState> = {
        type: 'FETCH_HOME_TITLE_THUNK_SUCCESS',
        payload: title,
      };
      expect(homeActions.fetchTitleThunk(title)).toEqual(expectedAction);
    });
  });
});
