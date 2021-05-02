import nextConnect from 'next-connect';
import auth from '../../../middleware/auth';
import passport from 'passport';

const handler = nextConnect();

handler
  .use(auth)
  .get(
    passport.authenticate(
      'github',
      {
        scope: ['user:email']
      }
    )
  )

export default handler;