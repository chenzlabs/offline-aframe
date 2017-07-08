var webpack = require('webpack');

var PLUGINS = [];
if (process.env.NODE_ENV === 'production') {
  PLUGINS.push(new webpack.optimize.UglifyJsPlugin());
}

/* doesn't work...
module.loaders = [
  {
    test: /node_modules\/aframe-assets\/fonts\/.+\.(json|png)$/,
    loader: 'file-loader?name=aframe-assets/fonts/[name].[ext]'
  },
  {
    test: /node_modules\/aframe-assets\/controllers\/.+\.(obj|mtl)$/,
    loader: 'file-loader?name=aframe-assets/controllers/[name].[ext]'
  }
];
*/

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'build.js'
  },
  plugins: PLUGINS
};
