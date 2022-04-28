import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";
import Admin from "./pages/Admin";
import NewProduct from "./pages/NewProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products/add" element={<NewProduct />} />
        <Route path="/" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
