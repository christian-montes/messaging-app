import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithubSquare } from  '@fortawesome/free-brands-svg-icons';

export default function RegisterButton({ google }) {
  return (
    <>
      <button 
        className={google ? 'btn google-button' : 'btn github-button'}
        type='button'>
          <span className='bigger-icon'><FontAwesomeIcon icon={google ? faGoogle : faGithubSquare} /></span>{' '}
          {google ? 'Sign up with Google' : 'Sign up with GitHub'}
      </button>
    </>
  )
}