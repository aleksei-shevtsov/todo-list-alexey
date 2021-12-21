import React, {useState} from 'react';
import './app.css';
import { Routes, Route } from 'react-router-dom';
import Context from '../../context';
import LoginPage from '../login-page/login-page';
import AppContent from '../app-content/app-content';

function setTokenToStorage(userToken) {
    sessionStorage.setItem('token', userToken);
}

function getTokenFromStorage() {
    return sessionStorage.getItem('token');
}

function App() {

  const [token, setToken] = useState(getTokenFromStorage())

  function handlerToken(newToken) {
    setToken(newToken);
    setTokenToStorage(newToken)
  }

  return (
    <Context.Provider value={{handlerToken, token}}>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/app" element={<AppContent/>}/>
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;