import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './login-page.css';
import Button from 'react-bootstrap/Button';

// const getJwtToken = async () => {
//     axios
//     .post('http://localhost:1337/auth/local', {
//       identifier: 'author@strapi.io',
//       password: 'strapi',
//     })
//     .then(response => {
//       // Handle success.
//       console.log('Well done!');
//       console.log('User profile', response.data.user);
//       console.log('User token', response.data.jwt);
//       setJwtToken(response.data.jwt)
//     })
//     .catch(error => {
//       // Handle error.
//       console.log('An error occurred:', error.response);
//     });
//   }

  


function LoginPage(props) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [todos, setTodos] = useState([]);
    const [token, setToken] = useState();
    let getToken = '';

    useEffect(() => {

      axios.get('http://localhost:1337/todos', {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('res.data ', res.data)
          setTodos(res.data)
      })
    }, [getToken])

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
          console.log('data.json().jwt ',result)
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
      // window.addEventListener("unhandledrejection", event => {
      //   console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
      // });
      props.setTokenInApp(getToken, todos);
    }

    return(
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
          <Button variant="outline-danger">Get JWT</Button>
      </div>
    );
}

export default LoginPage;

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
}
