const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/pages/main/main.js',
    auth: './src/pages/auth/auth.js',
    details:'./src/pages/filmDetails/details.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
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
      chunks: ['main']
    }),
    new HTMLPlugin({
      filename: 'auth.html',
      template: './src/pages/auth/auth.html',
      chunks: ['auth']
    }),
    new HTMLPlugin({
      filename: 'details.html',
      template: './src/pages/filmDetails/details.html',
      chunks: ['details']
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
