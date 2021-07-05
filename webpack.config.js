const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/pages/main/main.js',
    auth: './src/pages/auth/auth.js',
    details:'./src/pages/filmDetails/details.js',
  },
  output: {
    filename: '[name].bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HTMLPlugin({
      filename: 'index.html',
      template: './src/pages/main/main.html',
    }),
    new HTMLPlugin({
      filename: 'auth.html',
      template: './src/pages/auth/auth.html',
    }),
    new HTMLPlugin({
      filename: 'details.html',
      template: './src/pages/filmDetails/details.html',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
