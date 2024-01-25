// Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { logo } from '../assets';
import swal from 'sweetalert';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Perform login logic and redirect on success
    login({ username, password })
      .then(() => {
        swal({
          title: 'Success',
          text: 'Login Successful!',
          icon: 'success',
          timer: 1000,
          buttons: false,
        }).then(() => {
          navigate('/motor');
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        swal({
          title: 'Incorrect username or password',
          text: `Please enter valid credentials!`,
          icon: 'error',
          buttons: false,
        });
        setError(`An error occurred. Please try again.`); // Set error message
      });
  };

  return (
    <div className='cover'>
      <div className={`cover-login fade-in`}>
        <img src={logo} alt='Logo' id='loginbrandimg' />
        <h1>Login</h1>
        <form>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <input
            type='password'
            placeholder=' Password'
            value={password}
            onChange={handlePasswordChange}
            required
          />

          {error && <p className='error-message'>{error}</p>}
          <button type='button' onClick={handleLogin}>
            Log in
          </button>
        </form>
        <p style={{ marginTop: '50px' }}>
          <Link to='/login'>
            <em style={{ fontSize: '17px', textDecoration: 'none' }}></em>
          </Link>{' '}
        </p>
      </div>
    </div>
  );
}

export default Login;
