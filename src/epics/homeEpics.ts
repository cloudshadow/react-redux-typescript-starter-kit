import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootAction, RootState, Services } from '@/types/GlobalTypes';
import rootAction from '@/actions';

export const getTitleEpic: Epic<RootAction, RootAction, RootState, Services> = (action$, state$, api) =>
  action$.pipe(
    filter(isActionOf(rootAction.homeActions.fetchTitleEpicAsync.request)),
    switchMap(() =>
      from(api.homeApis.getTitleObservable()).pipe(
        map(payload => rootAction.homeActions.fetchTitleEpicAsync.success(payload.data)),
        // mergeMap(payload => of(rootAction.homeActions.fetchTitleEpicAsync.success(payload.data))),
        catchError(error => of(rootAction.homeActions.fetchTitleEpicAsync.failure(error)))
      )
    )
  );
