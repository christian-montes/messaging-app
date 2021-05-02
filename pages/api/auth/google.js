import nextConnect from 'next-connect';
import auth from '../../../middleware/auth';
import passport from 'passport'

const handler = nextConnect();

handler
  .use(auth)
  .get(
    passport.authenticate(
      'google', 
      { scope: ['https://www.googleapis.com/auth/userinfo.profile']}
    )
  )

export default handler;