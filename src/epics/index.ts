import { combineEpics } from 'redux-observable';
import * as homeEpics from './homeEpics';

// prettier-ignore
const rootEpic = combineEpics(
  ...Object.values(homeEpics),
);

export default rootEpic;
