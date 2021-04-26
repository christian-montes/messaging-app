import { parse, serialize } from 'cookie';
import { createLoginSession, getLoginSession } from './auth';

/**
 * This function parses cookie contained in request headers
 * if it exists
 * @param {obj} req: request object containing cookie
 */
function parseCookie(req) {

  // cookies do not need to be parsed for API routes
  if (req.cookies) {return req.cookies};

  // cookies MUST be parsed for pages
  const cookie = req.headers?.cookie;

  // parse cookie if not undefined from optional chaining
  // or parse empty string to prevent raising exception
  return parse(cookie || '')
};


/**
 * function destructures the request object;
 * then parses the cookie if present;
 * finally sets headers to create a session;
 * @param {obj} request: properties name, secret, and cookie
 */
export default function session({ name, secret, cookie: cookieOpts }) {
  return async (req, res, next) => {
    const cookies = parseCookie(req);
    // setting token to the name property of cookies
    const token = cookies[name];
    let unsealed = {};

    if (token) {
      try {
        // unseal the cookie using the password "secret"
        unsealed = await getLoginSession(token, secret);
      } catch (e) {
        console.error('Cookie is invalid');
      }
    }

    // set session property of req to decrypted token if try/catch did not fail
    req.session = unsealed;

    // Here we are proxying res.end to commit the session cookie
    const oldEnd = res.end;
    res.end = async function resEndProxy(...args) {
      if (res.finished || res.writableEnded || res.headersSent) return;
      if (cookieOpts.maxAge) {
        req.session.maxAge = cookieOpts.maxAge;
      }

      const token = await createLoginSession(req.session, secret);

      res.setHeader('Set-Cookie', serialize(name, token, cookieOpts));
      oldEnd.apply(this, args)
    }

    // using next-connect / express-like syntax
    next()

  }
}