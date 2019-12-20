import { Epic } from "redux-observable";
import { from, of } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootAction, Services } from '@/types/GlobalTypes'
import rootAction from '@/actions';
import { IAppState } from '@/reducers';

export const getResponseEpic: Epic<RootAction, RootAction, IAppState, Services> = (action$, state$, api) => action$.pipe(
  filter(isActionOf(rootAction.cloudActions.fetchEpicAsync.request)),
  switchMap(() =>
    from(api.cloudApis.getEpicRequest()).pipe(
      map(rootAction.cloudActions.fetchEpicAsync.success),
      catchError(error => of(rootAction.cloudActions.fetchEpicAsync.failure(error))),
    )
  )
);