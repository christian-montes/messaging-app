import passport from 'passport';
import LocalStrategy from 'passport-local';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import GitHubStrategy from 'passport-github2';
import { findUserById, findUserByUsername, validatePassword, findOrUpdateUser } from './db';

// serialize user for session
passport.serializeUser((user, done) => {

  // using the unique id from MONGO DB
  done(null, user._id);
});

// MAY NEED TO REMOVE req FROM FUNCTION CALLS
// LOOKS TO ONLY BE USED FOR MOCK DB CALLS
passport.deserializeUser((req, id, done) => {

  // findUserByUsername function from .db
  // deserialize the user and return the user object stored in DB
  const user = findUserById(req, id);
  done(null, user)
});


// setting up LocalStrategy
passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      // first find user in DB
      // passing the req object to be destructured by the function
      const user = await findUserByUsername(username);
      const validated = await validatePassword(user, password)
      if (!user || !validated) {
        done(null, null);
      } else {
        // if the user exists and the password matches return the user object
        done(null, user);
      }
    }
  )
)

passport.use(
  new GoogleStrategy({
    clientID: 'GOOGLE_CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    callbackURL: '/api/auth/google-callback'
  },
  // verify callback
  async (accessToken, refreshToken, profile, done) => {
    const user = await findOrUpdateUser(profile, done);

    return user;
  })
)

passport.use(
  new GitHubStrategy({
    clientID: 'GITHUB_CLIENT_ID',
    clientSecret: 'GITHUB_CLIENT_SECRET',
    callbackURL: '/api/auth/github-callback'
  },
  // passport verify callback
  async (accessToken, refreshToken, profile, done) => {
    const user = await findOrUpdateUser(profile, done);

    return user;
  })
)

export default passport