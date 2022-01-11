import React from 'react';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../login-page/login-page';
import AppContent from '../app-content/app-content';

function App() {

  return (
    <BrowserRouter>
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/register" element={<LoginPage/>}/>
            <Route path="/app" element={<AppContent/>}/>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
