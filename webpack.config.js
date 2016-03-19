var path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: [
    "./app.js",
  ],

  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      }
    ],
  }
};
