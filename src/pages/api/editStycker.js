/* eslint-disable camelcase */
import { MongoSideProjectCollection } from "../../backend/db/StyckerData/sideProjects";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { easyLoadUserServer } from "../../backend/auth/easyGetUser";
import { ObjectId } from "mongodb";

export function matchDisplayNameToType(type) {
  switch (type) {
    case "other":
      return "Other";
    case "github":
      return "Github";
    case "buymeacoffee":
      return "Buy Me A Coffee";
    case "cashlink":
      return "Direct Contribution";
    default:
      return "";
  }
}

export default async function handler(req, res) {
  const spCollection = await MongoSideProjectCollection();
  const { styckerJSON } = req.query;
  let constructedStycker;
  const supabase = await createServerSupabaseClient({
    req,
    res,
  });

  /* supabaseServerClient({ req, res }).auth.api.getUser(
    req.cookies["sb-access-token"]
  ); */

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userRaw = (await supabase.auth.getUser()).data.user;

  if (!session || !userRaw)
    return res.status(401).json({
      error: "not_authenticated",
      description:
        "The user does not have an active session or is not authenticated",
    });

  const suuser = await easyLoadUserServer(supabase, userRaw);

  if (!suuser)
    return res.status(401).json({
      error: "not_authenticated",
      description:
        "The user does not have an active session or is not authenticated",
    });

  try {
    constructedStycker = JSON.parse(styckerJSON);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .send(`Invalid JSON: ${styckerJSON}. Parsed Error: ${JSON.stringify(e)}`);
    return;
  }

  const date = new Date(Date.now());

  const objectToUpdate_id = constructedStycker._id;
  const oldObject = await spCollection.findOne({
    _id: new ObjectId(objectToUpdate_id),
  });

  if (!(suuser.id === oldObject.owner_user_id)) {
    return res.status(403).json({
      error: "forbidden",
      description: "The user does not match the user on file.",
    });
  }

  try {
    // Make sure some properties aren't specified, to avoid conflicts
    const {
      _id,
      owner_user_id,
      created_at,
      updated_at,
      views,
      favorites,
      user,
      contribution_links,
      ...deConstructedStycker
    } = constructedStycker;
    const cc = {
      _id: new ObjectId(objectToUpdate_id),
      favorites: 1,
      views: 1,
      created_at: oldObject.created_at,
      user: {
        name: suuser.full_name,
        avatar_url: suuser.avatar_url,
        id: suuser.id,
      },
      owner_user_id: suuser.id,
      updated_at: date,
      ...deConstructedStycker,
      contribution_links: contribution_links.map((value) => {
        return {
          icon_url: value.type,
          url: value.text,
          display_name: matchDisplayNameToType(value.type),
        };
      }),
    };
    console.log(JSON.stringify(cc));
    const data = await spCollection.replaceOne(
      { _id: new ObjectId(objectToUpdate_id) },
      cc
    );
    return res.status(200).json({ c: data.modifiedCount });
  } catch (e) {
    console.log(e);
    console.log("Error");
    return res.status(400).send("Server Error");
  }
}
