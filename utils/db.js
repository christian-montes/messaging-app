import connectToDatabase from './db-connection';
import argon2 from 'argon2';
import { ObjectID } from 'mongodb';

/**
 * createUser will be used on sign up
 * @password will be hashed using argon2i variant
 * 
 * should not set my own salt here
 * serves to protect against rainbow tables
 * default value by argon2 is unset; 
 * generates a cryptographically safe random salt
 */

 /**
  * Function hashes password and registers user.
  * Returns new user object created
  * @param {Object} param0 Request object containing username
  * password, and name supplied.
  */
export async function createUser({ username, password }) {
  const { db } = connectToDatabase();
  const hash = await argon2.hash(password, {
    type: argon2.argon2i
  });

  const newUser = {
    dateCreated: Date.now(),
    username,
    hash
  }

  // will be used by the useUser hook
  await db.insertOne(newUser, (err, doc) => {
    if (err) return err;

    return doc.ops[0];
  });
};

/** finding and returning the user object by ID 
 * for deserialization by passport
 */
export async function findUserById(id) {
  const { db } = connectToDatabase();

  await db.findOne({_id: new ObjectID(id)}, (err, doc) => {
    return doc;
  })
};

/**
 * Searches MongoDB for user document and returns document
 * @param {String} username Username entered in sign up or login form
 */
export async function findUserByUsername(username) {
  const { db } = await connectToDatabase();
  // let user

  await db.findOne({username: username}, (err, doc) => {
    if (err) return err;
    // user = doc;
    return doc
  })
  // console.log(user)
  // return user
}

export async function validatePassword({ hash }, passwordEntered) {
  const inputHash = await argon2.hash(passwordEntered, {
    type: argon2.argon2i
  });

  const passwordsMatch = hash === inputHash;
  return passwordsMatch;
}


// function for finding and/or updating user for Google OAuth
export async function findOrUpdateUser(profile, done) {
  const { db } = await connectToDatabase();

  db.findOneAndUpdate(
    {id: profile.id},
    {
      $setOnInsert: {
        id: profile.id,
        name: profile.name || 'New User',
        photo: profile.picture,
        email: profile.email || 'No public email',
        createdOn: new Date(),
        provider: profile.provider || ''
      },

      $set: {
        lastLogin: new Date()
      },

      $inc: {
        loginCount: 1
      }
    },

    {upsert: true, new: true},
    (err, doc) => {
      if (err) return done(err);
      return done(null, doc.value);
    } 
  )
}

