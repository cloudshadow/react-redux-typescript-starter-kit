import { produce } from 'immer';
import { ActionType } from 'typesafe-actions';
import rootAction from '@/actions';
import homeReducer, { IHomeState, defaultHomeState } from '@/reducers/homeReducer';

export type HomeActionsType = ActionType<typeof rootAction.homeActions>;
describe('home reducer', () => {
  const initialState = defaultHomeState;
  it('should return the initial state', () => {
    expect(homeReducer(undefined, {}  as HomeActionsType)).toEqual(initialState)
  })
  it('should handle rootAction.homeActions.fetchThunk', () => {
    expect(
      homeReducer(initialState, rootAction.homeActions.fetchTitleThunk(initialState))
    ).toEqual(
      produce<IHomeState>(initialState, draft => {
        draft = {...draft, id: 1, title:'title' };
      })
    )
  })
  it('should handle rootAction.homeActions.fetchEpicAsync.success', () => {
    expect(
      homeReducer(initialState, rootAction.homeActions.fetchTitleEpicAsync.success(initialState))
    ).toEqual(
      produce<IHomeState>(initialState, draft => {
        draft = {...draft, id: 1, epicTitle:'title' };
      })
    )
  })
});