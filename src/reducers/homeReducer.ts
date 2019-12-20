import produce from 'immer';
import { ActionType, getType } from "typesafe-actions";
import rootAction from '@/actions';
import { ITitle } from '@/types/HomeTypes';

export type HomeActionsType = ActionType<typeof rootAction.homeActions>;
export type IHomeState = ITitle;
export const defaultHomeState: IHomeState = {id:0, title:'', epicTitle:''};

const homeReducer = (state: IHomeState = defaultHomeState, action: HomeActionsType) => {
  switch (action.type) {
    case getType(rootAction.homeActions.fetchTitleThunk):
      return produce(state, draft => {draft.title = action.payload.title });
    case getType(rootAction.homeActions.fetchTitleEpicAsync.success):
      return produce(state, draft => {draft.epicTitle = action.payload.epicTitle });
    default:
      return state;
  }
};

export default homeReducer;