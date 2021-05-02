import nextConnect from 'next-connect';
import auth from '../../../middleware/auth';
import passport from 'passport';

const reqHandler = nextConnect();

reqHandler
  .use(auth)
  .get(
    passport.authenticate('google', { failureRedirect: '/'}),
    (req, res) => {
      res.status(302).redirect('/profile')
    }
  )

export default reqHandler;
