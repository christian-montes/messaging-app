import { useState } from 'react';
import RegisterButton from './register-buttons';
import axios from 'axios';

export default function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [style, setStyle] = useState({border: '1px solid lightgrey'});
  const [message, setMessage] = useState('');

  const registerUser = async event => {
    event.preventDefault();
    
    const response = await axios({
      method: 'POST',
      url: '/api/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: event.target.username.value,
        password: event.target.password.value
      }
    });

    const { registerSuccess } = response;

  }

  const checkUsername = async event => {
    event.preventDefault();
    setUsername(event.target.value)

    const response = event.target.value && await axios({
      // GET requests send params to backend to check if username is taken
      method: 'GET',
      url: '/api/register',
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        username: event.target.value
      }
    });

    // console.log(response)
    const { status } = response;
    (!status) ? (
      setStyle({border: '1px solid lightgrey'}),
      setMessage('')
    )
    : (status === 201) ? (
      setStyle({border: '2px solid green'}),
      setMessage('Username available')
    ) 
    : (
      setStyle({border: '2px solid red'}),
      setMessage('Username not available')
    )

  }

  return (
    <>
      <h2>Register an account</h2>

      <div className='container'>
        <div className='row mx-1'>{message ? message : ''}</div>
        <form className='col-sm-8 mb-3' onSubmit={registerUser}>
          <div className='form-floating mb-2'>
            <input
              defaultValue={username}
              name='username'
              style={style}
              onChange={checkUsername}
              type='username' 
              className='form-control' 
              id='username'
              placeholder='Username'
            />
            <label htmlFor='username'>Username</label>
          </div>

          <div className='form-floating mb-2'>
            <input 
              defaultValue={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              type='password' 
              className='form-control' 
              id='password'
              placeholder='Password'
            />
            <label htmlFor='password'>Password</label>
          </div>

          <div className='d-grid gap-2'>
            <button 
              className='btn btn-success' 
              type='submit' 
              disabled={!(username && password.length >= 5)}>Register
            </button>
          </div>
        </form>
        <hr className='col-sm-8'/>
        <div className='d-grid gap-1 col-sm-8'>
          <RegisterButton google />
          <RegisterButton />
        </div>
      </div>
    </>
  )
}