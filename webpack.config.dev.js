const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const HappyPack = require('happypack');
const moduleFederationConfig = require('./webpack.module.federation.config');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); //not support html-webpack-plugin
// const smp = new SpeedMeasurePlugin(); //not support html-webpack-plugin
const deps = require('./package.json').dependencies;
const mode = 'development';

module.exports = {
  mode,
  entry: './src/index.tsx',
  target: mode === 'development' ? 'web' : 'browserslist',
  devtool: 'inline-source-map',
  cache: {
    type: 'memory',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        // loader: 'babel-loader',
        use: ['happypack/loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader?name=[name].[ext]'],
      },
      {
        test: /\.ico$/,
        use: ['file-loader?name=[name].[ext]'],
      },
      {
        test: /(\.css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
    new HappyPack({
      loaders: ['babel-loader'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      REACT_APP_ENV: 'development',
      MODULE_FEDERATION_MODE: 'client'
    }),
    new ModuleFederationPlugin(
      // moduleFederationConfig(deps).clientConfig
      moduleFederationConfig(deps).hostConfig
    ),
  ],
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    https: false,
    host: '0.0.0.0',
    port: 9000,
    client: {
      logging: 'info',
      progress: true,
    },
    // headers: [
    //   {
    //     key: 'X-Custom',
    //     value: 'foo',
    //   },
    // ],
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};
