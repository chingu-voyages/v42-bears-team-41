import mongoClientPromise from "../../client";

export async function MongoStyckerData() {
  const mongoClient = await mongoClientPromise;
  return mongoClient.db("StyckerData");
}
