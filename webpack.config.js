const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    filename: "bundle.js",
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "./"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
