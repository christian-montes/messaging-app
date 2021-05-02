import { useState, useEffect } from 'react';
import RegisterButton from './register-buttons';
import axios from 'axios';
import Router from 'next/router';
import { useUser } from '../utils/useUser';

export default function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [style, setStyle] = useState({border: '1px solid lightgrey'});
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(0);
  const [user, { mutate }] = useUser('');

  const registerUser = async event => {
    event.preventDefault();
    
    const response = await axios({
      method: 'POST',
      url: '/api/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username,
        password
      }
    });

    const { status } = response;
    const { data } = response;

    if (status === 201) {
      const userObj = data;
      mutate(userObj);
    } else {
      setMessage(data);
    }

  }

  // conditional side effect
  // effect only executes when user variable changes
  useEffect(() => {

    // if there is a user object, redirect to profile page
    if (user) Router.push('/profile')
  }, [user])



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
    const { data } = response;
    const { status } = response;
    (!status) ? (
      setStyle({border: '1px solid lightgrey'}),
      setMessage(''),
      setStatus(0)
    )
    : (status === 201) ? (
      setStyle({border: '2px solid green'}),
      setMessage(data),
      setStatus(status)
    ) 
    : (
      setStyle({border: '2px solid red'}),
      setMessage(data),
      setStatus(status)
    )

  }

  const checkPassword = event => {
    event.preventDefault();

    setPassword(event.target.value);

    if (event.target.value.length >= 5) {
      event.target.style.border = '2px solid green'
    } else {
      event.target.style.border = '1px solid lightgrey'
    }

  }

  return (
    <>
      <h2>Register an account</h2>

      <div className='container'>
        <div 
          className='d-flex flex-row-reverse col-sm-8 mx-1'
          style={(message && status === 201) ? 
          {visibility: 'visible', color: 'green'} 
          : (message && status === 200) ? 
          {visibility: 'visible', color: 'red'}
          : {visibility: 'hidden'}}>
            {message ? message : 'hidden'}
        </div>
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
              onChange={checkPassword}
              type='password' 
              className='form-control' 
              id='password'
              placeholder='Password'
            />
            <label htmlFor='password'>Password (5+ characters)</label>
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