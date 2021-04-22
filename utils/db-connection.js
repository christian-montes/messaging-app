import { MongoClient } from 'mongodb';

// importing URI string and db name environment variables
const { MONGODB_URI, MONGODB_DB } = process.env;

// throw error if mongo uri is not defined
if (!MONGODB_URI) {
  throw new Error(
    'Mongo URI environment variable is not defined'
  );
};

if (!MONGODB_DB) {
  throw new Error(
    'Mongo Database environment variable is not defined'
  )
}


/**
 * Global object is used to maintain a cached connection across
 * hot reloads in NextJS. This serves to prevent the connection pool
 * from reaching the maximum number of connections.
 */

 let cached = global.mongo;

//  if cached is null/ has not been defined
 if (!cached) {
   cached = global.mongo = {conn: null, promise: null}
 };

 export async function connectToDatabase() {
  // if cached.conn is not null return it
  // used when the function is called again
  // this is used instead of calling Client.connect again
  // MEMOIZATION
  if (cached.conn) {
    return cached.conn;
  }


  // if there is no promise aka there is no connection to the DB
  // should only run ONE TIME
  if (!cached.promise) {
    // defining the options used to connect to the client
    const opts = {
      useNewUrlParse: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      }
    })
  }

  cached.conn = await cached.promise;
  
  // returning the database instance connection
  return cached.conn
 }