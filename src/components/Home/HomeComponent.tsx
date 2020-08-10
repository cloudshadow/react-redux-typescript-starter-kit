import * as React from 'react';
import { getTitleThunk } from '@/apis/homeApis';
import { IHomeState } from '@/types/HomeTypes';
import './home.scss';

// React.memo instead of PureComponent
interface IHomeProps {
  fetchTitleThunk: (title: IHomeState) => void;
  fetchTitleEpicRequest: () => void;
  homeState: IHomeState;
}
const HomeComponent: React.FunctionComponent<IHomeProps> = React.memo(
  ({ fetchTitleThunk, fetchTitleEpicRequest, homeState }) => {
    React.useEffect(() => {
      // Get title by thunk
      getTitleThunk().then((payload) => {
        fetchTitleThunk(payload.data);
      });

      // Get title by epic
      fetchTitleEpicRequest();
    }, []);

    if (homeState.loading) return <p>Loading...</p>;
    if (homeState.error) return <p>Error :(</p>;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">{homeState.title ? homeState.title : ''}</div>
          <div className="col-sm-12">{homeState.epicTitle ? homeState.epicTitle : ''}</div>
          <div>{!homeState.epicTitle && !homeState.title ? 'Loading...' : ''}</div>
        </div>
      </div>
    );
  }
);

export default HomeComponent;
