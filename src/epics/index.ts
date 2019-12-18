import { combineEpics } from 'redux-observable';
import { getTitleEpic } from './homeEpics';
import { getResponseEpic } from './cloudEpics';

const rootEpic = combineEpics(
  getTitleEpic,
  getResponseEpic,
);

export default rootEpic;