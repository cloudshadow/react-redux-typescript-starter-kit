module.exports = (deps) => ({
  hostConfig: {
    name: 'host',
    remotes: {
      react_client: `react_client@http://0.0.0.0:4002/remoteEntry.js`,
    },
    shared: {
      ...deps,
      react: {
        import: 'react',
        shareKey: 'react',
        shareScope: 'default',
        // eager: true, //which doesn't put the modules in a async chunk,
        // but provides them synchronously.This allows to use these shared modules in the initial chunk.
        // But be careful as all provided and fallback modules will always be downloaded.
        singleton: true, // only a single version of the shared module is allowed
        requiredVersion: deps['react'],
      },
      'react-dom': {
        eager: false,
        singleton: true,
        requiredVersion: deps['react-dom'],
      },
      'react-redux': {
        eager: false,
        singleton: true,
        requiredVersion: deps['react-redux'],
      },
      redux: {
        eager: false,
        singleton: true,
        requiredVersion: deps['redux'],
      },
      history: {
        eager: false,
        singleton: true,
        requiredVersion: deps['history'],
      },
      'typesafe-actions': {
        eager: false,
        singleton: true,
        requiredVersion: deps['typesafe-actions'],
      },
      axios: {
        eager: false,
        singleton: true,
        requiredVersion: deps['axios'],
      },
      'redux-observable': {
        eager: false,
        singleton: true,
        requiredVersion: deps['redux-observable'],
      },
      rxjs: {
        eager: false,
        singleton: true,
        requiredVersion: deps['rxjs'],
      },
      'redux-thunk': {
        eager: false,
        singleton: true,
        requiredVersion: deps['redux-thunk'],
      },
    },
  },
  clientConfig: {
    name: 'react_client',
    library: { type: 'var', name: 'react_client' },
    filename: 'remoteEntry.js',
    exposes: {
      './Home': './src/Containers/HomePage',
    },
    shared: {
      ...deps,
    },
  },
});
