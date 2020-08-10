import * as React from 'react';
import { getThunkRequest } from '@tempPath/apis/templateApis';
import { ITemplateState } from '@tempPath/types/TemplateTypes';
import './template.scss';

interface ITemplateProps {
  fetchThunk: (temp: ITemplateState) => void;
  fetchEpicRequest: () => void;
  templateState: ITemplateState;
}
const TemplateComponent: React.FunctionComponent<ITemplateProps> = React.memo(
  ({ fetchThunk, fetchEpicRequest, templateState }) => {
    React.useEffect(() => {
      // Get data by thunk
      getThunkRequest().then((payload) => {
        fetchThunk(payload.data);
      });

      // Get data by epic
      fetchEpicRequest();
    }, []);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">{templateState.text ? templateState.text : ''}</div>
          <div className="col-sm-12">{templateState.epicText ? templateState.epicText : ''}</div>
        </div>
      </div>
    );
  }
);

export default TemplateComponent;
