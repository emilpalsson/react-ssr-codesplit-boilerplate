import React, { Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";

const Home = React.lazy(() => import("./routes/Home"));
const Support = React.lazy(() => import("./routes/Support"));

const App = () => (
  <div>
    Nav:
    <Link to="/en-us/">Home</Link>
    <Link to="/en-us/support">Support</Link>
    <br />
    <br />
    <Suspense>
      <Routes>
        <Route path="/:locale/" element={<Home />} />
        <Route path="/:locale/support" element={<Support />} />
      </Routes>
    </Suspense>
  </div>
);

export default App;
