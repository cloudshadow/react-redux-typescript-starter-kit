import axios from 'axios';

export const interceptorRequest = () => {
  const token = localStorage.getItem('@CloudProject:token');
  axios.interceptors.request.use((config) => {
    config.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
    return config;
  });
};

export const interceptorResponse = () => {
  axios.interceptors.response.use(
    (response) => {
      // Do something with response data
      // console.log(response);
      return response;
    },
    (error) => {
      // console.log(error);
      // Do something with response error
      if (error.response.status >= 400) {
        // do something
        console.log('error');
      }
      return Promise.reject(error);
    }
  );
};
