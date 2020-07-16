import { produce } from 'immer';
import { ActionType } from 'typesafe-actions';
import rootAction from '@/actions';
import homeReducer, { IHomeState, defaultHomeState } from '@/reducers/homeReducer';

export type HomeActionsType = ActionType<typeof rootAction.homeActions>;
describe('home reducer', () => {
  const initialState = defaultHomeState;
  // const data = { id: 1, title: 'title1', epicTitle: 'epicTitle2' };
  it('should return the initial state', () => {
    expect(homeReducer(undefined, {} as HomeActionsType)).toEqual(initialState);
  });
  it('should handle rootAction.homeActions.fetchThunk', () => {
    expect(homeReducer(initialState, rootAction.homeActions.fetchTitleThunk({ id: 1, title: 'title', epicTitle: '' }))).toEqual(
      produce<IHomeState>(initialState, draft => {
        draft.id = 1;
        draft.title = 'title';
      })
    );
  });
  it('should handle rootAction.homeActions.fetchEpicAsync.success', () => {
    expect(
      homeReducer(initialState, rootAction.homeActions.fetchTitleEpicAsync.success({ id: 1, title: '', epicTitle: 'epicTitle' }))
    ).toEqual(
      produce<IHomeState>(initialState, draft => {
        draft.id = 1;
        draft.epicTitle = 'epicTitle';
      })
    );
  });
});
