import connectToDatabase from './db-connection';
import argon2 from 'argon2';
import { ObjectID } from 'mongodb';

const { db } = connectToDatabase();

/**
 * createUser will be used on sign up
 * @password will be hashed using argon2i variant
 * 
 * should not set my own salt here
 * serves to protect against rainbow tables
 * default value by argon2 is unset; 
 * generates a cryptographically safe random salt
 */
export async function createUser(req, { username, password, name }) {
  const hash = await argon2.hash(password, {
    type: argon2.argon2i
  });

  const newUser = {
    createdAt: Date.now(),
    username,
    name,
    hash
  }

  // will be used by the useUser hook
  await db.insertOne(newUser);
};

/** finding and returning the user object by ID 
 * for deserialization by passport
 */
export async function findUserById(id) {

  await db.findOne({_id: new ObjectID(id)}, (err, doc) => {
    return doc;
  })
};

/**
 * finding the object by username for 
 * local authentication strategy
 */
export async function findUserByUsername(username) {

  await db.findOne({username: username}, (err, doc) => {
    return doc
  })
}

export async function validatePassword({ hash }, passwordEntered) {
  const inputHash = await argon2.hash(passwordEntered, {
    type: argon2.argon2i
  });

  const passwordsMatch = hash === inputHash;
  return passwordsMatch;
}

