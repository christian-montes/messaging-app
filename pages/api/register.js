import connectToDatabase from '../../utils/db-connection';

export default function handler(req, res) {

  res.json({usernameTaken: true});
}