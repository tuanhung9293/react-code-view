var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')
var env = require('./config/env')
var getCSSLocalIdent = require('./config/getCssLocalIdent')

const PostCssLoaderOptions = {
  plugins: () => [ autoprefixer({
    browsers: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 9' // React doesn't support IE8 anyway
    ]
  }) ]
}

module.exports = {
  entry: {
    main: ['whatwg-fetch', './src/index.js']
  },
  output: {
    filename: 'assets/[hash].[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  resolve: {
    modules: ['node_modules', 'src']
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    compress: true,
    overlay: {
      errors: true,
      warnings: false
    },
    historyApiFallback: {
      rewrites: [
        { from: /^[^.]*$/, to: '/' }
      ]
    },
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 3000,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: {
          test: path.resolve(__dirname, 'node_modules'),
          exclude: path.resolve(__dirname, 'node_modules/copy-text-to-clipboard')
        },
        loader: 'babel-loader'
      },
      { test: /\.(woff|woff2)$/, exclude: '/node_modules/', use: 'file-loader?name=assets/fonts/[hash].[name].[ext]' },
      { test: /\.(svg|jpg|png)$/, exclude: '/node_modules/', use: 'file-loader?name=assets/[hash].[name].[ext]' },
      { test: /\.(ico)$/, exclude: '/node_modules/', use: 'file-loader?name=[name].[ext]' },
      { test: /\.json$/, exclude: '/node_modules/', use: 'json-loader' },
      { test: /\.html$/, exclude: '/node_modules/', use: [ 'html-loader' ] },
      {
        test: /\.css$/,
        exclude: ['/node_modules/', /\.module\.css$/],
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: PostCssLoaderOptions
          }
        ]
      },
      {
        test: /\.module\.css$/,
        exclude: ['/node_modules/'],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              getLocalIdent: getCSSLocalIdent
            }
          }, {
            loader: 'postcss-loader',
            options: PostCssLoaderOptions
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({}),
    // Expose needed env vars
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // ExtractTextPlugin for building to external css
    new ExtractTextPlugin('assets/[hash].[name].css'),
    // HtmlWebpackPlugin for loading template html an populating with css & js paths
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/template.html'
    })
  ]
}
