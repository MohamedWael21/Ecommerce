import mongoose from "mongoose";

export default async function connectToDb() {
  try {
    const database = await mongoose.connect(process.env.DB_URL!);
    console.log(`Connected to Database Server: ${database.connection.host}`);
  } catch (err) {
    throw err;
  }
}
