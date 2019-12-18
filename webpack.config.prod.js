const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const HappyPack = require('happypack');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const folderName = new Date().getTime();

module.exports = smp.wrap({
  mode: 'production',
  entry: [
    // must be first entry to properly set public path
    path.resolve(__dirname, 'src/index.tsx') // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  output: {
    path: path.resolve(__dirname, 'dist/' + folderName + '/'),
    publicPath: 'http://production.domain.com/' + folderName + '/',
    filename: '[name].[contenthash].js'
  },
  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    // new WebpackMd5Hash(),

    // Generate an external css file with a hash in the filename
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash].css",
      // chunkFilename: "[id].css"
    }),
    new HappyPack({
      loaders: [ 'babel-loader' ]
    }),
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
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
        minifyURLs: true
      },
      inject: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src', 'scss')]
        },
        context: '/'
      }
    })
  ],
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  module: {
    rules: [
      { 
        test: /\.(ts|js)x?$/, 
        // loader: 'babel-loader', 
        use: 'happypack/loader',
        exclude: /node_modules/ 
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        loaders: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap', 'sass-loader?sourceMap']
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  }
});