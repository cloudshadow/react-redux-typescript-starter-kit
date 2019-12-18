import { Epic } from "redux-observable";
import { from } from 'rxjs';
import { ActionType } from "typesafe-actions";
import { map, filter, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import rootAction from '../actions';
import { IAppState } from '../reducers';
import { getEpicRequest } from '../apis/templateApis';

type RootAction = ActionType<typeof rootAction>
export const getTemplateResponseEpic: Epic<RootAction, RootAction, IAppState> = action$ => action$.pipe(
  filter(isActionOf(rootAction.templateActions.fetchEpicAsync.request)),
  switchMap(action =>
    from(getEpicRequest()).pipe(
      map(response => rootAction.templateActions.fetchEpicAsync.success(response)),
      // catchError(error => of(actions.fetchTitleEpicAsync.error(error)))
    ),
  )
);