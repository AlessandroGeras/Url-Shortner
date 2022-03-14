import mongoose from "mongoose";
import { config } from "./apiConfig";

export class MongoConnection {
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(config.Mongo_Connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Mongo database connected");
    } catch (err) {
      console.error("Erro:" + err.message);
      process.exit(1);
    }
  }
}
