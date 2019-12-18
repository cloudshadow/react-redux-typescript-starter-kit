import { Epic } from "redux-observable";
import { from } from 'rxjs';
import { ActionType } from "typesafe-actions";
import { map, filter, switchMap } from 'rxjs/operators';
// import { ofType, combineEpics, createEpicMiddleware } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import rootAction from '../actions';
import { IAppState } from '../reducers';
import { getEpicTitle } from '../apis/homeApis';

type RootAction = ActionType<typeof rootAction>
export const getTitleEpic: Epic<RootAction, RootAction, IAppState> = action$ => action$.pipe(
  filter(isActionOf(rootAction.homeActions.fetchTitleEpicAsync.request)),
  switchMap(action =>
    from(getEpicTitle()).pipe(
      map(response => rootAction.homeActions.fetchTitleEpicAsync.success(response)),
      // catchError(error => of(actions.fetchTitleEpicAsync.error(error)))
    ),
  )
);