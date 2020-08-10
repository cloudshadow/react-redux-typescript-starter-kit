import { produce } from 'immer';
import { ActionType } from 'typesafe-actions';
import rootAction from '@/actions';
import { IHomeState } from '@/types/HomeTypes';
import homeReducer, { defaultHomeState } from '@/reducers/homeReducer';

export type HomeActionsType = ActionType<typeof rootAction.homeActions>;
describe('home reducer', () => {
  const initialState = defaultHomeState;
  // const data = { id: 1, title: 'title1', epicTitle: 'epicTitle2' };
  it('should return the initial state', () => {
    expect(homeReducer(undefined, {} as HomeActionsType)).toEqual(initialState);
  });
  it('should handle rootAction.homeActions.fetchThunk', () => {
    expect(
      homeReducer(
        initialState,
        rootAction.homeActions.fetchTitleThunk({ id: 1, title: 'title', epicTitle: '', loading: false, error: false })
      )
    ).toEqual(
      produce<IHomeState>(initialState, (draft) => {
        draft.id = 1;
        draft.title = 'title';
        draft.loading = false;
        draft.error = false;
      })
    );
  });
  it('should handle rootAction.homeActions.fetchEpicAsync.request', () => {
    expect(homeReducer(initialState, rootAction.homeActions.fetchTitleEpicAsync.request())).toEqual(
      produce<IHomeState>(initialState, (draft) => {
        draft.loading = true;
        draft.error = false;
      })
    );
  });
  it('should handle rootAction.homeActions.fetchEpicAsync.success', () => {
    expect(
      homeReducer(
        initialState,
        rootAction.homeActions.fetchTitleEpicAsync.success({
          id: 1,
          title: '',
          epicTitle: 'epicTitle',
          loading: false,
          error: false,
        })
      )
    ).toEqual(
      produce<IHomeState>(initialState, (draft) => {
        draft.id = 1;
        draft.epicTitle = 'epicTitle';
        draft.loading = false;
        draft.error = false;
      })
    );
  });
});
