import { ActionsObservable } from 'redux-observable';
import { Subject, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import axios, { AxiosResponse } from 'axios';
import { isActionOf, getType } from 'typesafe-actions';
// import MockAdapter from 'axios-mock-adapter';
import { getTitleEpic } from '@/epics/homeEpics';
import rootAction from '@/actions';
import api from '@/apis';
import { ITitle } from '@/types/HomeTypes';
import { defaultHomeState, IHomeState } from '@/reducers/homeReducer';
import { StateObservable } from 'redux-observable';
import urlHelper from '@/utils/urlHelper';

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;
const testScheduler = new TestScheduler((actual, expected) => {
  // Assuming Jest
  expect(actual).toEqual(expected);
});

describe('home epic test', () => {
  describe('getEpicTitle', () => {
    test('send correct actions when success', done => {
      
      // await mockedAxios.get.mockResolvedValue(response);
      // mockedAxios.get.mockImplementation(() => Promise.resolve(response)); //Promise.resolve(response)
      // console.log(mockedAxios.get.mockImplementation(response));
      // mockedAxios.get.mockImplementation(
      //   () => of<AxiosResponse<ITitle>>(response)
      //   // ():Promise<AxiosResponse<ITitle>> => axios.get('epictitle').then(response => response)
      // );  
      // const expected = rootAction.homeActions.fetchTitleEpicAsync.success(response.data);
      
      // const action$ = ActionsObservable.of(
      //   rootAction.homeActions.fetchTitleEpicAsync.success(response.data)
      // );
      // const action = of(
      //   rootAction.homeActions.fetchTitleEpicAsync.success(response.data)
      // );

      
      
      
      // expect(action).resolves.toEqual(expected);
      // getTitleEpic(action$, stateMocked$, api)
      // expect(action$).toEqual(expected);
      // getTitleEpic(action$, stateMocked$, api).subscribe(actions => {
      //     expect(actions).resolves.toEqual(expected);
      //     done();
      //   }
      // );
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const response = {status:200, data:{id: 1, title: 'title', epicTitle: 'epicTitle'}};
        const action$ = new ActionsObservable(
          hot('a', {a: rootAction.homeActions.fetchTitleEpicAsync.success(response.data)})
        );
        const stateMocked$: StateObservable<IHomeState> = new StateObservable(new Subject(), defaultHomeState);

        const expected = rootAction.homeActions.fetchTitleEpicAsync.success(response.data);
        console.log('===================1')
        console.log(expected)
        
        const output$ = getTitleEpic(action$, stateMocked$, api);
        console.log(output$)
        expectObservable(output$).toBe('a', { a: expected });
      });
    });

    // test('send correct actions when error', done => {
    //   const error = {name: 'Error', message: 'message'};

    //   jest.spyOn(api.homeApis,'getEpicTitle').mockImplementation(
    //     ():Promise<AxiosResponse<ITitle>> => axios.get('epictitle').catch(response => response)
    //   );

    //   const expected =  rootAction.homeActions.fetchTitleEpicAsync.failure(error);

    //   const action$ = ActionsObservable.of(
    //     rootAction.homeActions.fetchTitleEpicAsync.failure(error)
    //   );
    //   const stateMocked$: StateObservable<IHomeState> = new StateObservable(new Subject(), defaultHomeState);

    //   getTitleEpic(action$, stateMocked$, api)
    //     .subscribe((actual: any) => {
    //         expect(actual).toEqual(expected);
    //         done();
    //       }
    //     );
    // });
  });
});