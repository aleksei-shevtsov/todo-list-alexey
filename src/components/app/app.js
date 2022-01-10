import React, {useState} from 'react';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Context from '../../context';
import LoginPage from '../login-page/login-page';
import AppContent from '../app-content/app-content';

// function setTokenToStorage(userToken) {
//   return sessionStorage.setItem('token', userToken);
// }

// function getTokenFromStorage() {
//   return sessionStorage.getItem('token');
// }

function App() {

  // const [token, setToken] = useState(getTokenFromStorage())

  // function handlerToken(newToken) {
  //   setToken(newToken);
  //   setTokenToStorage(newToken)
  // }

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