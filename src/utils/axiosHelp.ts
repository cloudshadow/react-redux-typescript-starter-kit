import axios from 'axios';

export const interceptorResponse = () => {
    axios.interceptors.response.use( response => {
      // Do something with response data
      // console.log(response);
      return response;
    }, error => {
      // console.log(error);
      // Do something with response error
      if( error.response.status >= 400 ) {
        // do something
        console.log("error");
      }
      return Promise.reject(error);
    });
}

// export enum HTTP_VERBS {
//   DELETE = 'DELETE',
//   GET = 'get',
//   PATCH = 'patch',
//   POST = 'post',
//   PUT = 'put'
// }
// export const axiosRequest = (method: HTTP_VERBS, url: string, data: any, params?: any, headers?: any) => 
// axios.request({ method, url, params, data, headers });
