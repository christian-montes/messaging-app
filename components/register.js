import { useState } from 'react';
import RegisterButton from './register-buttons';

export default function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <h2>Register an account</h2>

      <div className='container'>
        <div className='row'>
          <div className='col-sm'>
            <div className='form-floating mb-2'>
              <input 
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
              type='username' 
              className='form-control' 
              id='floating-username'
              placeholder='new-username'
              />
              <label for='new-username'>Username</label>
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
              <label for='password'>Password</label>
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