import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootAction, RootState, Services } from '@tempPath/types/GlobalTypes';
import rootAction from '@tempPath/actions';

export const getTemplateResponseEpic: Epic<RootAction, RootAction, RootState, Services> = (action$, state$, api) =>
  action$.pipe(
    filter(isActionOf(rootAction.templateActions.fetchEpicAsync.request)),
    switchMap(() =>
      from(api.templateApis.getEpicRequest()).pipe(
        map((payload) => rootAction.templateActions.fetchEpicAsync.success(payload.data)),
        catchError((error) => of(rootAction.templateActions.fetchEpicAsync.failure(error)))
      )
    )
  );
