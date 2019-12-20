import * as React from 'react';
import { getThunkRequest } from '@/apis/cloudApis';
import { ICloudState } from '@/types/CloudTypes';
import './cloud.scss';

interface ICloudProps{
  fetchThunk: (temp: ICloudState)  => void;
  fetchEpicRequest: ()  => void;
  cloudState: ICloudState;
}
const CloudComponent: React.FunctionComponent<ICloudProps> = React.memo(({
  fetchThunk,
  fetchEpicRequest,
  cloudState
}) => {
  React.useEffect(() => {
    // Get title by thunk
    getThunkRequest().then(temp => {
      fetchThunk(temp)
    })
    
    // Get title by epic
    fetchEpicRequest();
  },[]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          {cloudState.text?cloudState.text:''}
        </div>
        <div className="col-sm-12">
          {cloudState.epicText?cloudState.epicText:''}
        </div>
      </div>
    </div>
  );
  
});

export default CloudComponent;