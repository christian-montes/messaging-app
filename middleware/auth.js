import nextConnect from 'next-connect';
import passport from '../utils/passport';
import session from '../utils/session';

const { TOKEN_SECRET, NODE_ENV } = process.env;

const auth = nextConnect()
  .use(
    // using session middleware
    session({
      name: 'sess',
      secret: TOKEN_SECRET,
      cookie: {
        maxAge: 60 * 60 * 2, // 2 hours
        httpOnly: true,
        // secure once launched to production
        secure: NODE_ENV === 'production',
        // points to root route, might need to change
        path: '/',
        sameSite: 'lax'
      }
    })
  )
  .use(passport.initialize())
  .use(passport.session());

export default auth;