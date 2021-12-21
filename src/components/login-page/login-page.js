import React, {useState, useEffect, useContext} from 'react';
import { useNavigate  } from 'react-router-dom';
// import PropTypes from 'prop-types';
import './login-page.css';
import Context from '../../context';
import AppContent from '../app-content/app-content';
import Button from 'react-bootstrap/Button';

function LoginPage() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();
  let getToken = '';

  const {handlerToken} = useContext(Context)

  async function loginUser(credentials) {
    return fetch('http://localhost:1337/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .then(result => {
      return result.jwt
    })
    .catch(error => {
      console.log('An error occurred:', error.response);
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    getToken = await loginUser({
      identifier: `${username}`,
      password: `${password}`
    })
    console.log('getToken ', getToken)
    if (getToken) {
      navigate('/app', {replace: true});
      handlerToken(getToken)
    }
  }

  return (
    <>
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
            {/* Вариант оформления кнопок */}
            {/* <Button variant="outline-danger">Get JWT</Button> */}  
      </div>
    </>
  )
} 


export default LoginPage;

