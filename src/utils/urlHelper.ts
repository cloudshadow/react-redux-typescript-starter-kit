import { IServer } from '@/types/UtilsTypes';

const urlHelper = {
  servers: {
    prodServer: {
      address: '',
      apiPath: 'CloudShadow/Api/',
    },
  },
  t: (server: IServer, url: string) => {
    const localDev =
      window.location.href.indexOf('//localhost') > -1 ||
      window.location.href.indexOf('//192') > -1 ||
      window.location.href.indexOf('//172') > -1 ||
      window.location.href.indexOf('//10') > -1 ||
      window.location.href.indexOf('//0') > -1;

    if (localDev && !server.address) {
      // console.log(remoteServer + apiPath + url);
      console.log(`${server.apiPath + url}: %cLocal Debug + Json Data`, 'color:blue;font-size:1em;');
      return '../mock_data/' + (server.apiPath + url).split('?')[0].split('/').join('_') + '.json';
    } else if (localDev && server.address) {
      console.log(`${server.apiPath + url}: %cLocal Debug + Remote Server`, 'color:green;font-size:1em;');
      return server.address + server.apiPath + url;
    } else if (!localDev) {
      return window.location.origin + '/' + server.apiPath + url;
    } else {
      return url;
    }
  },
};

export default urlHelper;
