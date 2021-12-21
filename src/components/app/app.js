import React, {useState} from 'react';
import './app.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../../routes/private-route';
import Context from '../../context';
import LoginPage from '../login-page/login-page';
import AppContent from '../app-content/app-content';

function setTokenToStorage(userToken) {
    sessionStorage.setItem('token', userToken);
}

function getTokenFromStorage() {
  try {
    return sessionStorage.getItem('token');
  }
  catch (error) {console.log(error)}
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
          {/* <Route path="/" element={token ? <Navigate to="/app" /> : <LoginPage setToken={setToken}/>}/> */}
          <Route path="/" element={<LoginPage/>}/>
          {/* <Route path="/app" element={!token ? <Navigate to="/" /> : <AppContent token={token} />}/> */}
          <Route path="/app" element={<AppContent/>}/>

          {/* <Route
            path="/app"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AppContent token={token} />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </div>
    </Context.Provider>
   
  );
}

export default App;