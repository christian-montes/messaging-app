import { useState, useCallback } from 'react';
import RegisterButton from './register-buttons';
import axios from 'axios';
import { eventListeners } from '@popperjs/core';


export default function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [style, setStyle] = useState({border: '1px solid lightgrey'})

  async function registerUser(event) {
    event.preventDefault();
    
    const response = await axios({
      method: 'POST',
      url: '/api/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: username,
        password: password
      }
    }).then(
      r => {r.json()}
    );

    // const { usernameTaken } = response;

  }

  const checkUsername = async event => {
    event.preventDefault();
    setUsername(event.target.value)

    const response = await axios({
      method: 'GET',
      url: '/api/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: event.target.value
      }
    });

    console.log(response)
    const { usernameTaken } = response.data;

    usernameTaken && (setStyle({border: '2px solid red'}))
  }

  return (
    <>
      <h2>Register an account</h2>

      <div className='container'>
        <div className='row'>
          <div className='col-sm'>
            <div className='form-floating mb-2'>
              <input 
                defaultValue={username}
                style={style}
                onChange={checkUsername}
                type='username' 
                className='form-control' 
                id='new-username'
                placeholder='Username'
              />
              <label htmlFor='new-username'>Username</label>
            </div>

            <div className='form-floating mb-2'>
              <input 
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password' 
                className='form-control' 
                id='password'
                placeholder='Password'
              />
              <label htmlFor='password'>Password</label>
            </div>

            <div className='d-grid gap-2'>
              <button className='btn btn-success' type='button' disabled={!username}>Register</button>
            </div>
          </div>
          <div className='d-grid gap-2 col-sm divider'>
            <RegisterButton google />
            <RegisterButton />
          </div>
        </div>
      </div>
    </>
  )
}