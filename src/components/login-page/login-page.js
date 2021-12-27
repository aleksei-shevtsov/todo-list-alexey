import React, {useState, useContext} from 'react';
import { useNavigate  } from 'react-router-dom';
import './login-page.css';
// import Context from '../../context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from '../loader/Spinner';

function LoginPage() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  // const {handlerToken} = useContext(Context)
  let navigate = useNavigate();
  let getToken = '';

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
    setLoading(true);
    getToken = await loginUser({
      identifier: `${username}`,
      password: `${password}`
    });
    console.log('getToken ', getToken);
    sessionStorage.setItem('token', getToken);
    navigate('/app', {replace: true});
    setLoading(false)
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form className="form-items" onSubmit={handleSubmit}>
        {loading ? 
        <div className="spinner-background">
          <div className="spinner">
            <Spinner/>
          </div>
        </div> : 
        null}
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Login"
            onChange={e => setUserName(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Login</label>
        </Form.Floating>
        <Form.Floating>
          <Form.Control
            id="floatingPasswordCustom"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPasswordCustom">Password</label>
        </Form.Floating>
        <div className="btn-position">
          <Button variant="outline-secondary" type="submit">Submit</Button>
        </div>
      </form>
    </div>
  )
} 

export default LoginPage;

