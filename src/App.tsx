import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './containers/HomePage';
import NotfoundPage from './containers/NotfoundPage';
import configureStore from './stores/configureStore';

const store = configureStore();
// const OrdersPage = React.lazy(() => import('@/pages/orders'));
// const OrdersMobilePage = React.lazy(() => import('@/pages/orders/mobile'));
const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            {/* <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} /> */}
            <Route path="*" element={<NotfoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
