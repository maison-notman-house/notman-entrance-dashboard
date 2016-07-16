module.exports = {
  context: __dirname + '/src',
  entry: './main.js',
  output: {
    path: __dirname + '/build',
    filename: 'main.bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  }
};
