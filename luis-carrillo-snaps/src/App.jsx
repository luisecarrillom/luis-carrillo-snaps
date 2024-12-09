import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComponentName from "./components/ComponentName/ComponentName";
import PageName from "./pages/PageName/PageName";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
        
          <Route path="/" element={<ComponentName />} />
      
          <Route path="/photo/:id" element={<PageName />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
