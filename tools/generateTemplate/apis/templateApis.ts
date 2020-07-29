import axios, { AxiosResponse } from 'axios';
import urlHelper from '@/utils/urlHelper';
import { ITemp } from '@tempPath/types/TemplateTypes';

export function getThunkRequest(): Promise<AxiosResponse<ITemp>> {
  return axios.get<ITemp>(urlHelper.t('thunk'));
}
export function getEpicRequest(): Promise<AxiosResponse<ITemp>> {
  // return fetch(`http://0.0.0.0:4000/mock_data/CloudShadow_Api_title.json`).then(response => response);
  return axios.get<ITemp>(urlHelper.t('epic'));
}
