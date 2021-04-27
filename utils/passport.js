import passport from 'passport';
import LocalStrategy from 'passport-local';
import { findUserById, findUserByUsername, validatePassword } from './db';

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
    {passReqToCallback: true},
    (req, username, password, done) => {
      // first find user in DB
      // passing the req object to be destructured by the function
      const user = findUserByUsername(req, username);
      if (!user || !validatePassword(user, password)) {
        done(null, null);
      } else {
        // if the user exists and the password matches return the user object
        done(null, user);
      }
    }
  )
)

export default passport