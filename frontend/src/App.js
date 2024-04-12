import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import './App.css';
import DataTable from './components/DataTables';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/data/:filename" element={<DataTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
