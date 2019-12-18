import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunkMiddleware from 'redux-thunk';
import { ActionType } from "typesafe-actions";
import {createBrowserHistory, History} from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootReducer, { IAppState } from '../reducers';
import rootAction from '../actions';
import rootEpic from '../epics';

export type RootActions = ActionType<typeof rootAction>;
export const history: History = createBrowserHistory();
const epicMiddleware = createEpicMiddleware<RootActions, RootActions, IAppState>();
function configureStoreProd(preloadedState?: any) {
  const middlewares = [
    // Add other middleware on this line...
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
    epicMiddleware,
    routerMiddleware(history),
  ];

  const store = createStore(
    rootReducer(history), 
    compose(
      applyMiddleware(...middlewares)
    )
  );
  epicMiddleware.run(rootEpic);
  return store;
}

function configureStoreDev(preloadedState?: any) {
  const middlewares = [
    // Add other middleware on this line...
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
    epicMiddleware,
    routerMiddleware(history),
  ];

  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    rootReducer(history), 
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }
  epicMiddleware.run(rootEpic);

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;