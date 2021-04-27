import { useState } from 'react';
import RegisterButton from './register-buttons';
import axios from 'axios';

export default function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [style, setStyle] = useState({border: '1px solid lightgrey'})

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

    const response = await axios({
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
    if (status === 201) {
      setStyle({border: '2px solid green'});
    } else {
      setStyle({border: '2px solid red'})
    }

  }

  return (
    <>
      <h2>Register an account</h2>

      <div className='container'>
        <div className='row'>
          <form className='col-sm' onSubmit={registerUser}>
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
          <div className='d-grid gap-2 col-sm divider'>
            <RegisterButton google />
            <RegisterButton />
          </div>
        </div>
      </div>
    </>
  )
}