const path = require("path");
const TerserPlugin = require("terser-webpack-plugin"); // This plugin is used to minify your JavaScript/Typescript files.
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // A Webpack plugin to optimize \ minimize CSS assets.
const LoadablePlugin = require("@loadable/webpack-plugin");
const ROOT_DIR = path.resolve(__dirname, "../../");
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const BUILD_DIR = resolvePath("dist");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const clientConfig = {
  target: "web",
  mode: "production",
  entry: {
    client: "./src/client/index.js",
  },
  devtool: false,
  output: {
    path: resolvePath(BUILD_DIR, "client"),
    publicPath: "/client/",
    // Chunkhash is based on webpack entry point Each entry defined will have it’s own hash.
    // If anything changes for that particular entry point than only corresponding hash will change.
    // :8 is used to done slicing of hashes (eg: 8c4cbfdb instead of 8c4cbfdb91ff93f3f3c5).
    filename: "[name].[chunkhash:8].js",
    chunkFilename: "[name].[chunkhash:8].js",
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
    new LoadablePlugin({
      outputAsset: false,
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
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(), // minify the css
      new TerserPlugin(),
    ],
  },
};

module.exports = clientConfig;
