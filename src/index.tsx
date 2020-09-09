import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import HomePage from './containers/HomePage';
import NotfoundPage from './containers/NotfoundPage';
import configureStore from './stores/configureStore';
import { history } from '@/reducers';
import './index.scss';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    {/* use env process.env.NODE_ENV or process.env.REACT_APP_ENV*/}
    <ConnectedRouter history={history}>
      <div className="index-container">
        <div className="switch-container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route component={NotfoundPage} />
          </Switch>
        </div>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
