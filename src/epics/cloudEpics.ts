import { Epic } from "redux-observable";
import { from } from 'rxjs';
import { ActionType, isActionOf } from "typesafe-actions";
import { map, filter, switchMap } from 'rxjs/operators';
import rootAction from '../actions';
import { IAppState } from '../reducers';
import { getEpicRequest } from '../apis/cloudApis';

type RootAction = ActionType<typeof rootAction>
export const getResponseEpic: Epic<RootAction, RootAction, IAppState> = action$ => action$.pipe(
  filter(isActionOf(rootAction.cloudActions.fetchEpicAsync.request)),
  switchMap(action =>
    from(getEpicRequest()).pipe(
      map(response => rootAction.cloudActions.fetchEpicAsync.success(response)),
      // catchError(error => of(actions.fetchTitleEpicAsync.error(error)))
    ),
  )
);