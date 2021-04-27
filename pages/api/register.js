import nextConnect from 'next-connect';
import auth from '../../middleware/auth';
import { createUser, findUserById, findUserByUsername } from '../../utils/db';

const handler = nextConnect();

handler
  // use the Passport authentication middleware
  .use(auth)
  // get request to check if username is taken
  .get(async (req, res) => {

    const { username: user } = req.query;
    const userExists = await findUserByUsername(user);

    console.log(!!userExists);

    if (userExists) {
      res.status(200).send('Username is taken');
    } else {
      res.status(201).send('Username available');
    }
  })
  .post((req, res) => {

    const { body: userInformation } = req;
    const newUser = createUser(userInformation);

    req.login(newUser, (err) => {
      if (err) throw err

      // log the newly registered user in
      // status 201: new resource created
      res.status(201).json({newUser})
    })
  });

  export default handler

