import produce from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import rootAction from '@tempPath/actions';
import { ITemp } from '@tempPath/types/TemplateTypes';
export type TemplateActionsType = ActionType<typeof rootAction.templateActions>;
export type ITemplateState = ITemp;
const templateState = (state: ITemplateState = { id: 0, text: '', epicText: '' }, action: TemplateActionsType) => {
  switch (action.type) {
    case getType(rootAction.templateActions.fetchThunk):
      return produce(state, (draft) => {
        draft.text = action.payload.text;
      });
    case getType(rootAction.templateActions.fetchEpicAsync.success):
      return produce(state, (draft) => {
        draft.epicText = action.payload.epicText;
      });
    default:
      return state;
  }
};

export default templateState;
