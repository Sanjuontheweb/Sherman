import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config({ quiet: true })
const connect = process.env.MONGO_CONN_STR;

//connecting with mongoclient along with mongoose
export async function connectToMongoDB() {
  const client = new MongoClient(connect);
  try {
    await client.connect();

    await mongoose.connect(connect)
    .then(() => {
      console.log("2. connected with", mongoose.connection.name, "db");
    })

    return client;
  } catch (err) {
    console.dir(err);
  }
}

export async function disconnectFromMongoDB() {
  await client.close();
}