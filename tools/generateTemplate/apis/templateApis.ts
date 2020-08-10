import axios, { AxiosResponse } from 'axios';
import urlHelper from '@/utils/urlHelper';
import { ITemplateState } from '@tempPath/types/TemplateTypes';

export function getThunkRequest(): Promise<AxiosResponse<ITemplateState>> {
  return axios.get<ITemplateState>(urlHelper.t(urlHelper.servers.prodServer, 'thunk'));
}
export function getEpicRequest(): Promise<AxiosResponse<ITemplateState>> {
  // return fetch(`http://0.0.0.0:4000/mock_data/CloudShadow_Api_title.json`).then(response => response);
  return axios.get<ITemplateState>(urlHelper.t(urlHelper.servers.prodServer, 'epic'));
}
