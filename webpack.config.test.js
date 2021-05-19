const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const HappyPack = require('happypack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin(); //not support html-webpack-plugin
const deps = require('./package.json').dependencies;
const folderName = new Date().getTime();

module.exports = {
  mode: 'production',
  entry: [
    // must be first entry to properly set public path
    path.resolve(__dirname, 'src/index.tsx'), // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  output: {
    path: path.resolve(__dirname, 'dist-stable/' + folderName + '/'),
    publicPath: 'http://stable.domain.com/' + folderName + '/',
    filename: '[name].[contenthash].js',
    chunkFilename: 'vender.[id].chunk.js',
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    // new WebpackMd5Hash(),

    // Generate an external css file with a hash in the filename
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      // chunkFilename: "[id].css"
    }),
    new HappyPack({
      loaders: ['babel-loader'],
    }),
    new HtmlWebpackPlugin({
      // Create HTML file that includes references to bundled CSS and JS.
      filename: '../index.html',
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src', 'scss')],
        },
        context: '/',
      },
    }),
    new webpack.EnvironmentPlugin({
      REACT_APP_ENV: 'production',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 300000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
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
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url-loader?limit=10000&mimetype=application/font-woff'],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=application/octet-stream'],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=image/svg+xml'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: ['file-loader?name=[name].[ext]'],
      },
      {
        test: /\.ico$/,
        use: ['file-loader?name=[name].[ext]'],
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
};
