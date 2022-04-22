module.exports = {
  entry: ['regenerator-runtime/runtime.js', './client/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  
  devtool: 'source-map',
  resolve: {
        extensions: ['.js', '.jsx']
    },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.(sass|less|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
