import produce from 'immer';
import { ActionType, getType, createReducer } from 'typesafe-actions';
import rootAction from '@tempPath/actions';
import { ITemplateState } from '@tempPath/types/TemplateTypes';
export type ITemplateActions = ActionType<typeof rootAction.templateActions>;
export const defaultTemplateState: ITemplateState = { id: 0, text: '', epicText: '' };

const template = createReducer<ITemplateState, ITemplateActions>(defaultTemplateState)
  .handleType(getType(rootAction.templateActions.fetchThunk), (state, action) =>
    produce(state, (draft) => {
      draft.id = action.payload.id;
      draft.text = action.payload.text;
    })
  )
  .handleType(getType(rootAction.templateActions.fetchEpicAsync.success), (state, action) =>
    produce(state, (draft) => {
      draft.id = action.payload.id;
      draft.epicText = action.payload.epicText;
    })
  );

export default template;
