import { MongoSideProjectCollection } from "@/backend/db/StyckerData/sideProjects";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const spCollection = await MongoSideProjectCollection();
  const { id } = req.query;

  if (!id) return res.status(400).send("Invalid ID");

  const data = await spCollection.findOne({ _id: new ObjectId(id) });

  res.status(200).json({
    id,
    data,
  });
}
