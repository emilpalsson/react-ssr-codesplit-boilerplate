import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import loadable from "@loadable/component";

// const Home = lazy(() => import("./routes/Home"));
// const Support = lazy(() => import("./routes/Support"));

const Home = loadable(() => import("./routes/Home"));
const Support = loadable(() => import("./routes/Support"));

const App = () => (
  <div>
    Nav:
    <Link to="/en-us/">Home</Link>
    <Link to="/en-us/support">Support</Link>
    <br />
    <br />
    <Routes>
      <Route path="/:locale/" element={<Home />} />
      <Route path="/:locale/support" element={<Support />} />
    </Routes>
  </div>
);

export default App;
