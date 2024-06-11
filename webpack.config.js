const path = require('path');

module.exports = {
  entry: './src/js/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 8000,
    devMiddleware: {
      writeToDisk: true, // This will write the bundled files to disk
    },
  },
};