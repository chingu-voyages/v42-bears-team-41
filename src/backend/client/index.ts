import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client: MongoClient;
let mongoClientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  mongoClientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  mongoClientPromise = client.connect();
}

export default mongoClientPromise;
