import React from "react";
import Home from "./pages/Home/Home";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Explore from "./pages/Explore/Explore";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
