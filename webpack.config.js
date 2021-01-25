const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: {
    main: path.join(__dirname, "src", "index.tsx"),
  },
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js', ".tsx", ".jsx",
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "bert",
      filename: "index.html",
      template: path.join(__dirname, "public", "index.html"),
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "..", "dist"),
    compress: true,
    port: 12345,
  }
};
