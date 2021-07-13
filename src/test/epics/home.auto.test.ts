import { Subject, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { getTitleEpic } from '@/epics/homeEpics';
import rootAction from '@/actions';
import { initialState } from './api.mock';
import { StateObservable } from 'redux-observable';
import { dependencies } from './api.mock';
import { RootState } from '@/types/GlobalTypes';

const testScheduler = new TestScheduler((actual, expected) => {
  return expect(actual).toEqual(expected);
});

describe('home epic test', () => {
  describe('getTitleEpic', () => {
    test('should return correct output observable (success) after getTitleEpic action observable', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const response = {
          data: { id: 1, title: 'title1', epicTitle: 'epicTitle2', loading: false, error: false },
          status: 200,
          statusText: 'OK',
          config: {},
          headers: {},
        };
        // const action$: ActionsObservable<RootAction> = ActionsObservable.from(
        //   hot('a|', { a: rootAction.homeActions.fetchTitleEpicAsync.request() })
        // );
        const action$ = hot('a|', { a: rootAction.homeActions.fetchTitleEpicAsync.request() });
        const stateMocked$: StateObservable<RootState> = new StateObservable(new Subject(), initialState);

        // dependencies.homeApis.getTitleEpic = jest.fn().mockReturnValue(of(response));
        dependencies.homeApis.getTitleObservable = jest.fn().mockImplementation(() => of(response));

        const expectedOutput$ = {
          a: rootAction.homeActions.fetchTitleEpicAsync.success(response.data),
        };

        const actualOutput$ = getTitleEpic(action$, stateMocked$, dependencies);
        expectObservable(actualOutput$).toBe('a|', expectedOutput$);
      });
    });
    test('should return correct output observable (failure) after getTitleEpic action observable', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('a|', { a: rootAction.homeActions.fetchTitleEpicAsync.request() });
        const stateMocked$: StateObservable<RootState> = new StateObservable(new Subject(), initialState);

        const err = new Error('TestError');
        dependencies.homeApis.getTitleObservable = jest.fn().mockImplementation(() => {
          return throwError(err);
        });

        const expectedOutput$ = {
          a: rootAction.homeActions.fetchTitleEpicAsync.failure(err),
        };

        const actualOutput$ = getTitleEpic(action$, stateMocked$, dependencies);
        expectObservable(actualOutput$).toBe('-a|', expectedOutput$);
      });
    });
  });
});
