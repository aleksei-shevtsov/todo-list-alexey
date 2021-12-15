import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import './index.css';
import App from './components/app/app';
import LoginPage from './components/login-page/login-page';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
      <div className="wrapper">
      <BrowserRouter>
        <h1>Application</h1>
        <Link to="/app">Open App</Link>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/app" element={<App />}/>
          </Routes>
        </BrowserRouter>
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
