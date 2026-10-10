// import { MongoClient } from 'mongodb';
// import dotenv from 'dotenv'
// import mongoose from 'mongoose';

// dotenv.config()

// //connecting with mongoose
// export async function connectMongoose(connect) {
//   try {
//     await mongoose.connect(connect)
//     .then(() => {
//       console.log("connected with mongoose!");
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

// //connecting with mongoclient
// export async function connectToMongoDB() {
//   const connect = process.env.MONGO_CONN_STR;
//   const client = new MongoClient(connect);
//   try {
//     await client.connect();
//     console.log("You successfully connected to MongoDB!");

//     return client;
//   } catch (err) {
//     console.dir(err);
//   }
// }

// // Call this only when your application terminates
// export async function disconnectFromMongoDB() {
//   await client.close();
// }

// connectMongoose(connect);