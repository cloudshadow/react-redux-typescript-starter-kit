import { combineEpics } from 'redux-observable';
import * as homeEpics from './homeEpics';

const rootEpic = combineEpics(...Object.values(homeEpics));

export default rootEpic;
