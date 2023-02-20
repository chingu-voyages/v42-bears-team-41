/* eslint-disable camelcase */
import { MongoSideProjectCollection } from "../../backend/db/StyckerData/sideProjects";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { easyLoadUserServer } from "../../backend/auth/easyGetUser";

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
    const data = await spCollection.insertOne({
      user: {
        name: suuser?.full_name ?? suuser?.username,
        avatar_url: suuser.avatar_url,
        id: suuser.id,
      },
      owner_user_id: suuser.id,
      created_at: date,
      updated_at: date,
      views: 1,
      favorites: 1,
      ...deConstructedStycker,
      contribution_links: contribution_links.map((value) => {
        return {
          icon_url: value.type,
          url: value.text,
          display_name: matchDisplayNameToType(value.type),
        };
      }),
    });
    return res.status(200).json({ id: data.insertedId });
  } catch (e) {
    console.log(e);
    console.log("Error");
    return res.status(400).send("Server Error");
  }
}
