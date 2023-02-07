import { MongoSideProjectCollection } from "@/backend/db/StyckerData/sideProjects";

export default async function handler(req, res) {
  const spCollection = await MongoSideProjectCollection();
  let { number = 1 /* q = "" */ } = req.query;
  number = parseInt(number);

  const data = await spCollection
    .aggregate([{ $sample: { size: number } }])
    .toArray(); // You want to get 5 docs.toArray();

  res.status(200).json({
    number,
    data,
  });
}
