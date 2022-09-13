import express from "express";
import compression from "compression";
import webpack from "webpack";
import WebpackDevMiddleware from "webpack-dev-middleware";
import WebpackHotMiddleware from "webpack-hot-middleware";
// import WebpackHotServerMiddleware from "webpack-hot-server-middleware";
import renderer from "./renderer";

const app = express();

if (process.env.NODE_ENV === "development") {
  const clientConfig = require("../../webpack/dev/webpack.dev.client.js");
  // const serverConfig = require("../../webpack/dev/webpack.dev.server.js");
  // const compiler = webpack([clientConfig, serverConfig]);
  const compiler = webpack(clientConfig);

  app.use(
    WebpackDevMiddleware(compiler, {
      publicPath: clientConfig.output.publicPath,
      serverSideRender: true,
    })
  );

  app.use(WebpackHotMiddleware(compiler));
  // app.use(WebpackHotServerMiddleware(compiler));
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
