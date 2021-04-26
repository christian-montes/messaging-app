import Iron from '@hapi/iron';

/**
 * Function creates session stored in header to keep user logged in.
 * Session uses @hapi/iron to encrypt the cookie
 * @param {Object} session Session object located inside request headers
 * @param {String} secret Password passed to Iron.seal
 */
export async function createLoginSession(session, secret) {
  const createdAt = Date.now();
  const obj = {...session, createdAt};

  // encrypting the token with 
  // Serializes, encrypts, and signs objects into an iron protocol string
  const token = await Iron.seal(obj, secret, Iron.defaults);

  // return the encrypted token to use for sessions
  return token;
};


/**
 * 
 * @param {Object} token encrypted token, contains session info
 * @param {String} secret Iron secret to decrypt token
 */
export async function getLoginSession(token, secret) {
  const session = await Iron.unseal(token, secret, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // check if the expiration date of the token has not passed
  if (session.maxAge && Date.now() > expiresAt) {
    // if expiration date has passed, raise exception
    throw new Error('Session has expired');
  }

  // return session if it has not expired yet
  return session;
}