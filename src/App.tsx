import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from  'react-router-dom';
import './App.scss';

import Home from "./Components/Home";
import NotFound from './Components/Common/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/not-found"
          element={<NotFound />}
        />
        <Route
          path="*"
          element={<Navigate to="/not-found" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
