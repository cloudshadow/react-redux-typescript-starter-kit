import produce from 'immer';
import { ActionType, getType, createReducer } from 'typesafe-actions';
import rootAction from '@/actions';
import { IHomeState } from '@/types/HomeTypes';

export type IHomeActions = ActionType<typeof rootAction.homeActions>;
export const defaultHomeState: IHomeState = { id: 0, title: '', epicTitle: '', loading: false, error: false };

const home = createReducer<IHomeState, IHomeActions>(defaultHomeState)
  .handleType(getType(rootAction.homeActions.fetchTitleThunk), (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = false;
      draft.id = action.payload.id;
      draft.title = action.payload.title;
    })
  )
  .handleType(getType(rootAction.homeActions.fetchTitleEpicAsync.request), (state, action) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = false;
    })
  )
  .handleType(getType(rootAction.homeActions.fetchTitleEpicAsync.success), (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = false;
      draft.id = action.payload.id;
      draft.epicTitle = action.payload.epicTitle;
    })
  );

export default home;
