const webpackNodeExternals = require("webpack-node-externals");
const path = require("path");
const ROOT_DIR = path.resolve(__dirname, "../../");
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const BUILD_DIR = resolvePath("dist");

const serverConfig = {
  target: "node",
  mode: "production",
  name: "server",
  entry: {
    server: "./src/server/index.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg|png|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: {
                exportOnlyLocals: true,
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    path: BUILD_DIR,
    filename: "[name].js",
    libraryTarget: "commonjs2",
    chunkFilename: "chunks/[name].js",
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  externals: [webpackNodeExternals()],
};

module.exports = serverConfig;
