import { MongoSideProjectCollection } from "../../backend/db/StyckerData/sideProjects";
import { sortByValues } from "@/config/enums/sortByValues";

export default async function handler(req, res) {
  const spCollection = await MongoSideProjectCollection();
  let {
    sortType,
    skip = 0,
    number = 100,
    filter = "{}" /* q = "" */,
  } = req.query;
  skip = parseInt(skip);
  number = parseInt(number);
  filter = JSON.parse(filter);

  if (!sortByValues.some((sortByValue) => sortByValue.value === sortType))
    res.status(400).send("Invalid sortType");

  const data = await spCollection
    .find(filter)
    .sort(sortDefiner(sortType))
    // .filter()
    .skip(skip)
    .limit(number)
    .toArray();

  res.status(200).json({
    sortType,
    skip,
    number,
    data,
    definedSortExpression: sortDefiner(sortType),
  });
}

const sortDefiner = (sortType) => {
  switch (sortType) {
    case "az":
      return { title: 1 };
    case "za":
      return { title: -1 };
    case "created_a":
      return { created_at: 1 };
    case "created_d":
      return { created_at: -1 };
    case "updated_a":
      return { created_at: 1 };
    case "updated_d":
      return { created_at: -1 };
    case "views_a":
      return { views: 1 };
    case "views_d":
      return { views: -1 };
    case "favorites_a":
      return { favorites: 1 };
    case "favorites_d":
      return { favorites: -1 };
  }
};
