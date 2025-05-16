import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Book from './components/Book';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;
