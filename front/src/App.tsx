import React from "react";
import ComponentsTest from "./components/page/components_test";
import Main from "./components/page/Main";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Establish from "./components/page/Establish";

function App() {
  return (
    <Routes>
      <Route index element={<Establish />} />
      <Route path=":discussId" element={<Main />} />
    </Routes>
  );
}

export default App;
