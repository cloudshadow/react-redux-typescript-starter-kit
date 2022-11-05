// import { createStore, configureStore, compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '@/reducers';
import rootEpic from '@/epics';
import services from '@/apis';
import { RootAction, RootState, Services } from '@/types/GlobalTypes';

// export const history: History = createBrowserHistory();
const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, Services>({
  dependencies: services,
});
function configureStoreProd() {
  const middlewares = [
    // Add other middleware on this line...
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
    epicMiddleware,
  ];

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  });
  epicMiddleware.run(rootEpic);
  return store;
}

function configureStoreDev() {
  const middlewares = [
    // Add other middleware on this line...
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
    epicMiddleware,
  ];

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('@/reducers', () => store.replaceReducer(rootReducer));
  }
  epicMiddleware.run(rootEpic);

  return store;
}

const configuredStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configuredStore;
