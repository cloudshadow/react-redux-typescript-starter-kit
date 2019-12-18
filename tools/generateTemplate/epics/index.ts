import { combineEpics } from 'redux-observable';
import { getTemplateResponseEpic } from './templateEpics';

const rootEpic = combineEpics(
  getTemplateResponseEpic,
);

export default rootEpic;