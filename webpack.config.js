var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

//npm start
//run prodcution -> NODE_ENV=production webpack
//run webpack --watch to build full client.min.js
//npm install npm@latest -g  Install latest npm
//npm run test --silent -> run test

module.exports = {
  context: path.join(__dirname, "public"),
//  devtool: debug ? "inline-sourcemap" : null,
  devtool: 'source-map',
  entry: "./js/client.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.s?css$/,
        loaders: ["style", "css", "sass"],
        include: path.join(__dirname,'public')
      }
    ]
  },
  output: {
    path: __dirname + "/public/",
    filename: "client.min.js",
    sourceMapFilename: 'client.js.map',
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false,
      },
      sourceMap: true,
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    })
  ]
};