const path = require('path');

module.exports = {
  mode: 'development', // Set mode to development or production
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      util: require.resolve("util/"),
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      querystring: require.resolve("querystring-es3"),
      assert: require.resolve("assert/"),
      os: require.resolve("os-browserify/browser"),
      fs: false,
      child_process: false,
      buffer: require.resolve("buffer/"),
      vm: require.resolve("vm-browserify"),
      constants: require.resolve("constants-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
};
