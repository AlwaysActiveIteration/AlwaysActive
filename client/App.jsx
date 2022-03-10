import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './containers/HomePage';
import SignUpLogInPage from './components/SignUpLogInPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUpLogInPage />} />
      <Route path="/HomePage" element={<HomePage />} />
    </Routes>
  );
}

export default App;
