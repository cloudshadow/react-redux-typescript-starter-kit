import { RootState } from '@/types/GlobalTypes';
import { defaultHomeState } from '@/reducers/homeReducer';
import { RouterState } from 'connected-react-router';
import { Services } from '@/types/GlobalTypes';

export const dependencies: jest.Mocked<Services> = {
  homeApis: {
    getTitleObservable: jest.fn(),
    getTitleThunk: jest.fn()
  }
};

export const initialState: RootState = {
  router: {} as RouterState,
  home: defaultHomeState
};
