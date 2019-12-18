import { homeActions } from './homeActions';
import { homeThunkActions } from './homeThunkActions';
import { cloudActions } from './cloudActions';

const rootAction = {
  homeActions,
  cloudActions,
  homeThunkActions,
}

export default rootAction;
