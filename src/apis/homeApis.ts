import axios, { AxiosResponse } from 'axios';
import urlHelper from '@/utils/urlHelper';
import { ITitle } from '@/types/HomeTypes';

// add @babel/plugin-transform-runtime: true for async
const getEpicTitle = async ():Promise<AxiosResponse<ITitle>> => {
  return await axios.get(urlHelper.t('epictitle')).then(response => response);
};

const getThunkTitle = async ():Promise<AxiosResponse<ITitle>> => {
  return await axios.get(urlHelper.t('title')).then(response => response);
}

export {
  getThunkTitle,
  getEpicTitle
}