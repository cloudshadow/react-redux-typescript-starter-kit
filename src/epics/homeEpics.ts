import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, switchMap, catchError, concatWith } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootAction, RootState, Services } from '@/types/GlobalTypes';
import rootAction from '@/actions';

export const getTitleEpic: Epic<RootAction, RootAction, RootState, Services> = (action$, state$, api) =>
  action$.pipe(
    filter(isActionOf(rootAction.homeActions.fetchTitleEpicAsync.request)),
    switchMap(() =>
      from(api.homeApis.getTitleObservable()).pipe(
        // mergeMap((payload) =>
        //   of(
        //     rootAction.homeActions.fetchTitleEpicAsync.success(payload.data),
        //   ).pipe(
        //     concatWith(
        //       // do some action after success
        //       of(rootAction.authActions.saveToken(payload.data)),
        //     )
        //   ).pipe(
        //     tap(action => localStorage.setItem('access_token', action.payload.accessToken))
        //   )
        // ),
        mergeMap((payload) =>
          of(
            rootAction.homeActions.fetchTitleEpicAsync.success(payload.data)
            // do some action after success
            // rootAction.homeActions.fetchTitleEpicAsync.success(payload.data)
          )
        ),
        catchError((error) => of(rootAction.homeActions.fetchTitleEpicAsync.failure(error)))
      )
    )
  );
