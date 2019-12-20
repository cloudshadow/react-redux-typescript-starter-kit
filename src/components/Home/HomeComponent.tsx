import * as React from 'react';
import { getThunkTitle } from '@/apis/homeApis';
import { ITitle } from '@/types/HomeTypes';
import './home.scss';

// React.memo instead of PureComponent
interface IHomeProps{
  fetchTitleThunk: (title: ITitle)  => void;
  fetchTitleEpicRequest: ()  => void;
  homeState: ITitle;
}
const HomeComponent: React.FunctionComponent<IHomeProps> = React.memo(({
  fetchTitleThunk,
  fetchTitleEpicRequest,
  homeState
}) => {
  React.useEffect(() => {
    // Get title by thunk
    getThunkTitle().then(payload => {
      fetchTitleThunk(payload.data)
    })
    
    // Get title by epic
    fetchTitleEpicRequest();
  },[]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          {homeState.title?homeState.title:''}
        </div>
        <div className="col-sm-12">
          {homeState.epicTitle?homeState.epicTitle:''}
        </div>
        <div>{!homeState.epicTitle&&!homeState.title?'Loading...':''}</div>
      </div>
    </div>
  );
  
});

export default HomeComponent;