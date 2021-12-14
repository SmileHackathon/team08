import React from "react";
import ComponentsTest from "./components/page/components_test";
import Main from "./components/page/Main";
import "./index.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ComponentsTest />} />
        <Route path="discussion/:discussId" element={<Main />} />
        <Route path="components_test" element={<ComponentsTest />} />
      </Route>
    </Routes>
  );
}

export default App;
