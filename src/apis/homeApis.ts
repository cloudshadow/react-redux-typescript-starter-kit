import axios from 'axios';
import urlHelper from '@/utils/urlHelper';

const getEpicTitle = () => {
  // return fetch(`http://0.0.0.0:4000/mock_data/CloudShadow_Api_title.json`).then(response => response);
  return axios.get(urlHelper.t('epictitle')).then(response => response.data);
};

const getThunkTitle = () => {
  return axios.get(urlHelper.t('title')).then(response => response.data);
}

export {
  getThunkTitle,
  getEpicTitle
}