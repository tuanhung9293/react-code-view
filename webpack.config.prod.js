var path = require('path')
var webpack = require('webpack')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var Visualizer = require('webpack-visualizer-plugin')
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
      'not ie < 11' // We support IE11+
    ]
  }) ]
}

module.exports = {
  entry: {
    main: ['whatwg-fetch', './src/index.js']
  },
  output: {
    filename: 'assets/[chunkhash].[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  resolve: {
    modules: ['node_modules', 'src']
  },
  devtool: 'nosources-source-map',
  bail: true,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnWarning: true,
          failOnError: true
        }
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
        loader:
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }, {
              loader: 'postcss-loader',
              options: PostCssLoaderOptions
            }]
          })
      },
      {
        test: /\.module\.css$/,
        exclude: ['/node_modules/'],
        loader:
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: true,
                getLocalIdent: getCSSLocalIdent
              }
            }, {
              loader: 'postcss-loader',
              options: PostCssLoaderOptions
            }]
          })
      }
    ]
  },
  plugins: [
    // Expose needed env vars to build
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // Minify bundles
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false
      },
      output: {
        comments: false,
        ascii_only: true
      },
      sourceMap: true
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: '../stats/stats.json'
    }),
    // Clean public folder before build
    new CleanWebpackPlugin(['public'], {
      root: path.resolve(__dirname),
      exclude: ['robots.txt']
    }),

    // ExtractTextPlugin for building to external css
    new ExtractTextPlugin('assets/[chunkhash].[name].css'),
    // Create a stats visualization for analyzing bundle size
    new Visualizer({
      filename: '../stats/stats.html'
    }),
    // HtmlWebpackPlugin for loading template html an populating with css & js paths
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/template.html'
    }),

    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|woff|woff2)$/,
      minRatio: 0.8
    })
  ]
}
