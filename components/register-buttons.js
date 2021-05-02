import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithubSquare } from  '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

export default function RegisterButton({ google, login }) {

  const googleAuth = async event => {
    event.preventDefault();

    axios.get(
      '/api/auth/google'
    )
  }

  const githubAuth = async event => {
    event.preventDefault();

    axios.get(
      '/api/auth/github'
    )
  }


  return (
    <>
      <button 
        className={google ? 'btn google-button' : 'btn github-button'}
        type='button'
        onClick={google ? googleAuth : githubAuth}
      >
          <span className='bigger-icon'><FontAwesomeIcon icon={google ? faGoogle : faGithubSquare} /></span>{' '}
          {google ? 
          (login ? 'Login with Google' : 'Sign up with Google') : 
          (login ? 'Login with GitHub' : 'Sign up with GitHub')}
      </button>
    </>
  )
}