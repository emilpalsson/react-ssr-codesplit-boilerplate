import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import path from "path";
import App from "../components/App";

export default (req) => {
  const loadableJson = path.resolve(__dirname, "./loadable-stats.json");

  const extractor = new ChunkExtractor({
    statsFile: loadableJson,
    entrypoints: ["client"],
  });

  const content = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter location={req.path} context={{}}>
        <App />
      </StaticRouter>
    </ChunkExtractorManager>
  );

  return `<html lang="en">
  <head>
  <base href="/" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React BoilerPlate</title>
    ${extractor.getStyleTags()}
  </head>
  <body>
    <div id="root">${content}</div>
    ${extractor.getScriptTags()}
  </body>
</html>`;
};
