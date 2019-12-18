const urlHelper = {
	t: (url:string) => {
		const localDev = (
			window.location.href.indexOf('//localhost') > -1
			|| window.location.href.indexOf('//192') > -1
			|| window.location.href.indexOf('//172') > -1
			|| window.location.href.indexOf('//10') > -1
			|| window.location.href.indexOf('//0') > -1
		);
		const remoteServer = '';
		const apiPath = 'CloudShadow/Api/';

		if (localDev && !remoteServer) {
			// console.log(remoteServer + apiPath + url);
			// console.log('%cLocal Debug + Json Data', 'color:blue;font-size:1em;');
			return '../mock_data/' + (apiPath + url).split('?')[0].split('/').join('_') + '.json';
		} else if (localDev && remoteServer) {
			// console.log('%cLocal Debug + Remote Server', 'color:green;font-size:1em;');
			return remoteServer + apiPath + url;
		} else if (!localDev) {
			return window.location.origin + '/' + apiPath + url;
		}else {
			return url;
		}
	}
}

export default urlHelper;