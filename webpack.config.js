var path = require('path');

module.exports = {
  context: __dirname,
  entry: './lemonade.js',
  output: {
    filename: './game_folder/bundle.js'
  },
  devtool: 'source-map',
  // resolve: {
  //   extensions:[".js", ".jsx", "*"]
  // },

  module: {
     loaders: [
       {
         test: [/\.jsx?$/, /\.js?$/],
         exclude: /node_modules/,
         loader: 'babel-loader',
         query: {
           presets: ['es2015']
         }
       }
     ]
   },
};
