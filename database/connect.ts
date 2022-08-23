import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { MONGO_URL } = process.env;

//TODO add logger
export async function connectToDb(): Promise<void> {
  try {
    await connect(MONGO_URL);

    console.log("Connected to database!");
  } catch (error) {
    console.log("Error with connecting to database" + error);
  }
}
