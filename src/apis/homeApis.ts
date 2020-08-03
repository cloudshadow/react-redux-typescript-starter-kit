import axios, { AxiosResponse } from 'axios';
import urlHelper from '@/utils/urlHelper';
import { ITitle } from '@/types/HomeTypes';

export function getTitleObservable(): Promise<AxiosResponse<ITitle>> {
  return axios.get<ITitle>(urlHelper.t(urlHelper.servers.prodServer, 'epictitle'));
}

export function getTitleThunk(): Promise<AxiosResponse<ITitle>> {
  return axios.get<ITitle>(urlHelper.t(urlHelper.servers.prodServer, 'title'));
}
