const webpack = require("webpack");
const path = require("path");
const LoadablePlugin = require("@loadable/webpack-plugin");
const ROOT_DIR = path.resolve(__dirname, "../../");
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const BUILD_DIR = resolvePath("dist");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const clientConfig = {
  target: "web",
  mode: "development",
  entry: {
    client: ["webpack-hot-middleware/client?reload=true&noInfo=true", "./src/client/index.js"],
  },
  devtool: "inline-cheap-module-source-map",
  devServer: {
    contentBase: "./dist",
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  output: {
    path: resolvePath(BUILD_DIR, "client"),
    publicPath: "/client/",
    filename: "[name].js",
    chunkFilename: "[name].js",
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: (info) =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    assetModuleFilename: "assets/[hash][ext][query]",
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //loadable plugin will create all the chunks
    new LoadablePlugin({
      outputAsset: false, // to avoid writing loadable-stats in the same output as client
      writeToDisk: true,
      filename: `${BUILD_DIR}/loadable-stats.json`,
    }),
    // Add any plugins required here for example: Bundle Analyzer, Copy Plugin etc
  ],
  optimization: {
    runtimeChunk: "single", // creates a runtime file to be shared for all generated chunks.
    splitChunks: {
      chunks: "all", // This indicates which chunks will be selected for optimization.
      automaticNameDelimiter: "-",
      cacheGroups: {
        vendor: {
          // to convert long vendor generated large name into vendor.js
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
    minimize: false,
    minimizer: [],
  },
};

module.exports = clientConfig;
