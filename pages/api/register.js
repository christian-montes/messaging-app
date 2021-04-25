import connectToDatabase from '../../utils/db-connection';

export default async function handler(req, res) {

  // cached mongo db instance used
  const { db } = await connectToDatabase();
  console.log(req.body);

  return new Promise(resolve => {
    switch (req.method) {
      case 'GET': {
        try {
          const { username: user } = req.query;

          db.findOne({username: user}, 
            (err, user) => {
              return err ? (console.error(err))
              : (user) ? (res.status(200).json({usernameTaken: true}), resolve())
              : (res.status(200).json({usernameTaken: false}), resolve())
            })
        } catch (error) {
          console.error('Database error');
          res.status(500).json({usernameTaken: 'error'});
          return resolve();
        }
      }

      case 'POST': {
        try {
          const { username: user, password } = req.body;

          db.insertOne({username: user, password: password}, 
            (err, doc) => {
              err ? res.json({error: true})
              : (done(null, doc.ops[0]))
            })
        } catch (error) {
          console.error(error);
        }
      }
    }
    
    // res.status(405).end();
    // return resolve();
  })


  // console.log(user);
  
  // res.json({usernameTaken: true});
}