import nextConnect from 'next-connect';
import auth from '../../middleware/auth';

const handler = nextConnect();

handler
  .use(auth)
  // get request to mutate the user object returned from mongo
  .get((req, res) => {
    // here I will mutate the user object by
    // only returning username

    // IMPORTANT not to return entire user object
    // because it contains the user hashed password
    // and other sensitive information

    // user object is located in request
    // after having called login when authenticated
    if (!req.user) return res.status(200).send('');
    const { username } = req.user;

    res.json({user: {username}});
  })

  export default handler;