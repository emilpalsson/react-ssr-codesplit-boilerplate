import express from "express";
import compression from "compression";
import webpack from "webpack";
import WebpackDevMiddleware from "webpack-dev-middleware";
import WebpackHotMiddleware from "webpack-hot-middleware";
import renderer from "./renderer";

const app = express();

if (process.env.NODE_ENV === "development") {
  const webpackConfig = require("../../webpack/dev/webpack.dev.client.js");
  const compiler = webpack(webpackConfig);

  app.use(
    WebpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true,
    })
  );

  app.use(WebpackHotMiddleware(compiler));
}

// Gzip
app.use(compression());
app.use(express.static("dist"));

app.get("*", (req, res) => {
  try {
    res.send(renderer(req));
  } catch (err) {
    console.log("error in rendering server side:", err);
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
