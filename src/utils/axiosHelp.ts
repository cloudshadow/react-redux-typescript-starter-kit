import axios from 'axios';

// export const interceptorRequest = () => {
//   axios.interceptors.request.use((config) => {
//     if (config.url.includes('/rest') || config.url.includes('/userinfo')) {
//       const currentDate = new Date().getTime();
//       const localAuth = JSON.parse(localStorage.auth);
//       if (currentDate >= localAuth.expiresTime) {
//         axiosHelper.refreshAuth();
//       }
//       if (localAuth.tokenType && localAuth.accessToken) {
//         config.headers.common['Authorization'] = localAuth.tokenType + ' ' + localAuth.accessToken;
//       }
//     } else {
//       config.headers.common['Authorization'] = null;
//     }
//     return config;
//   });
// };

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
