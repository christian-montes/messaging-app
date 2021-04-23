
export default function LoginForm() {
    return (
        <>
          <h2>Sign in</h2>

          <div className='form-floating mb-2'>
            <input 
            type='username' 
            className='form-control' 
            id='floating-username'
            placeholder='username123'
            />
            <label htmlFor='floating-username'>Username</label>
          </div>

          <div className='form-floating mb-2'>
            <input 
            type='password' 
            className='form-control' 
            id='floating-password'
            placeholder='Password'
            />
            <label htmlFor='floating-password'>Password</label>
          </div>

          <div className='d-grid gap-2'>
            <button className='btn btn-primary' type='button'>Login</button>
          </div>
        </>
    )
}