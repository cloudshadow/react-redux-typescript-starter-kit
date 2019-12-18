import produce from 'immer';
import { ActionType, getType } from "typesafe-actions";
import rootAction from '../actions';
import { ITemp } from '../types/CloudTypes';
export type CloudActionsType = ActionType<typeof rootAction.cloudActions>;
export type ICloudState = ITemp;
const cloudState = (state: ICloudState = {id:0, text:'', epicText:''}, action: CloudActionsType) => {
  switch (action.type) {
    case getType(rootAction.cloudActions.fetchThunk):
      return produce(state, draft => {draft.text = action.payload.text });
    case getType(rootAction.cloudActions.fetchEpicAsync.success):
      return produce(state, draft => {draft.epicText = action.payload.epicText });
    default:
      return state;
  }
};

export default cloudState;
