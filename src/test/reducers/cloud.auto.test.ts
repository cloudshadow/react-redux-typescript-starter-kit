import { produce } from 'immer';
import { ActionType } from 'typesafe-actions';
import rootAction from '@/actions';
import { ICloudState } from '@/types/CloudTypes';
import cloudReducer, { defaultCloudState } from '@/reducers/cloudReducer';

export type CloudActionsType = ActionType<typeof rootAction.cloudActions>;
describe('cloud reducer', () => {
  const initialState = defaultCloudState;
  it('should return the initial state', () => {
    expect(cloudReducer(undefined, {}  as CloudActionsType)).toEqual(initialState)
  })
  it('should handle rootAction.cloudActions.fetchThunk', () => {
    expect(
      cloudReducer(initialState, rootAction.cloudActions.fetchThunk(initialState))
    ).toEqual(
      produce<ICloudState>(initialState, draft => {
        draft = {...draft, id: 1, text:'text' };
      })
    )
  })
  it('should handle rootAction.cloudActions.fetchEpicAsync.success', () => {
    expect(
      cloudReducer(initialState, rootAction.cloudActions.fetchEpicAsync.success(initialState))
    ).toEqual(
      produce<ICloudState>(initialState, draft => {
        draft = {...draft, id: 1, text:'text' };
      })
    )
  })
});