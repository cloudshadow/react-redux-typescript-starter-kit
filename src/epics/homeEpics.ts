import { Epic } from "redux-observable";
import { from, of } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootAction, Services } from '@/types/GlobalTypes'
import rootAction from '@/actions';
import { IHomeState } from '@/reducers/homeReducer';

export const getTitleEpic: Epic<RootAction, RootAction, IHomeState, Services> = (action$, state$, api) => action$.pipe(
  filter(isActionOf(rootAction.homeActions.fetchTitleEpicAsync.request)),
  switchMap(() =>
    from(api.homeApis.getEpicTitle()).pipe(
      map(payload => rootAction.homeActions.fetchTitleEpicAsync.success(payload.data)),
      catchError(error => of(rootAction.homeActions.fetchTitleEpicAsync.failure(error))),
    )
  )
);