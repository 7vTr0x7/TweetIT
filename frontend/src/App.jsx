import React from "react";
import Home from "./pages/Home/Home";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Explore from "./pages/Explore/Explore";
import Bookmark from "./pages/Bookmark/Bookmark";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
