import * as React from 'react';
import { getThunkRequest } from '../../apis/templateApis';
import { ITemp } from '../../types/TemplateTypes';
import './template.scss';

interface ITemplateProps{
  fetchThunk: (temp: ITemp)  => void;
  fetchEpicRequest: ()  => void;
  templateState: ITemp;
}
const TemplateComponent: React.FunctionComponent<ITemplateProps> = React.memo(({
  fetchThunk,
  fetchEpicRequest,
  templateState
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
          {templateState.text?templateState.text:''}
        </div>
        <div className="col-sm-12">
          {templateState.epicText?templateState.epicText:''}
        </div>
      </div>
    </div>
  );
  
});

export default TemplateComponent;