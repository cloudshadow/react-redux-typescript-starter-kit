import axios from 'axios';
import urlHelper from '@/utils/urlHelper';
import { ICloudState } from '@/types/CloudTypes';

const getThunkRequest = ():Promise<ICloudState> => {
  return axios.get(urlHelper.t('template')).then(response => response.data);
}
const getEpicRequest = ():Promise<ICloudState> => {
  // return fetch(`http://0.0.0.0:4000/mock_data/CloudShadow_Api_title.json`).then(response => response);
  return axios.get(urlHelper.t('epictemplate')).then(response => response.data);
};

export {
  getThunkRequest,
  getEpicRequest
}