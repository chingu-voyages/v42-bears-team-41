import { MongoStyckerData } from ".";

export async function MongoSideProjectCollection() {
  const StyckerDataDB = await MongoStyckerData();
  return StyckerDataDB.collection("sideProjects");
}
