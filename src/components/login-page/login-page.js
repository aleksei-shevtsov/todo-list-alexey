import React, {useState, useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import './login-page.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from '../loader/Spinner';

function LoginPage() {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  let navigate = useNavigate();

  async function loginUser(credentials) {
    axios
      .post('http://localhost:1337/auth/local', credentials)
      .then(response => {
        sessionStorage.setItem('token', response.data.jwt);
        navigate('/app', {replace: true});
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
  }

  async function registerUser(credentials) {
    axios
      .post('http://localhost:1337/auth/local/register', credentials)
      .then(response => {
        sessionStorage.setItem('token', response.data.jwt);
        navigate('/app', {replace: true});
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
  }

  const handleLoginSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    await loginUser({
      identifier: `${username}`,
      password: `${password}`
    });
  }

  const handleRegisterSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await registerUser({
      username: `${username}`,
      email: `${email}`,
      password: `${password}`
    });
  }

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    return () => {
      setUserName('');
      setEmail('');
      setPassword('');
      //Doing this, whenever you leave that screen or the component unmounts, 
      //the state will be empty, so the components of your screen won't be trying to re-render again.
    };
  }, []); 

  if (window.location.href === 'http://localhost:3000/') {
    return (
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <Link to="/register">I'm a new user</Link>
        <form className="form-items" onSubmit={handleLoginSubmit}>
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
            <Button variant="outline-secondary" type="submit">Login</Button>
          </div>
        </form>
      </div>
    )
  } else if (window.location.href === 'http://localhost:3000/register') {
    return (
      <div className="login-wrapper">
        <h1>Please Sign In</h1>
        <Link to="/">I already have an account</Link>
        <form className="form-items" onSubmit={handleRegisterSubmit}>
          {loading ? 
          <div className="spinner-background">
            <div className="spinner">
              <Spinner/>
            </div>
          </div> : 
          null}
          <Form.Floating className="mb-3">
            <Form.Control
              id="regFloatingInputCustom"
              type="text"
              placeholder="Login"
              onChange={e => setUserName(e.target.value)}
            />
            <label htmlFor="floatingInputCustom">Login</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              id="regFloatingEmailCustom"
              type="email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="floatingEmailCustom">Email</label>
          </Form.Floating>
          <Form.Floating>
            <Form.Control
              id="regFloatingPasswordCustom"
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <i tabIndex="0" onClick={togglePasswordVisiblity} class={passwordShown ? "far fa-eye-slash" : "far fa-eye"}></i>
            <label htmlFor="floatingPasswordCustom">Password</label>
          </Form.Floating>
          <div className="btn-position">
            <Button variant="outline-secondary" type="submit">Register</Button>
          </div>
        </form>
      </div>
    )
  }
} 

export default LoginPage;
