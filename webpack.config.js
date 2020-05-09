const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


// Is development or production mode
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
  }
}

  if (isProd) {
    config.minimizer = [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsPlugin()
    ]
  }

  return config;
}



module.exports = {
  context: path.resolve(__dirname, 'src'),

  mode: 'development',

  entry: {
    main: './js/index.js'
  },

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@img': path.resolve(__dirname, 'src/img'),
    }
  },

  optimization: optimization(),

  devServer: {
    port: 4200,
    hot: isDev
  },

  plugins: [
    new HTMLPlugin({
      template: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name].${isDev ? "style" : "[hash]"}.css`
    }),
    new CopyWebpackPlugin([
      {
        from: 'img/icons', to: 'img',
      },
    ]),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          }
        }, 'css-loader']
      },

      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
}