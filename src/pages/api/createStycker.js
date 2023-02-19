/* eslint-disable camelcase */
import { MongoSideProjectCollection } from "@/backend/db/StyckerData/sideProjects";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { easyLoadUserServer } from "@/backend/auth/easyGetUser";

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

  const userRaw = await supabase.auth.getUser();

  if (!session || !userRaw.data.user)
    return res.status(401).json({
      error: "not_authenticated",
      description:
        "The user does not have an active session or is not authenticated",
    });

  const user = await easyLoadUserServer(supabase, userRaw);

  if (!user)
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
      ...deConstructedStycker
    } = constructedStycker;
    const data = await spCollection.insertOne({
      user: {
        name: user.name,
        avatar_url: user.avatar_url,
        id: user.id,
      },
      owner_user_id: user.id,
      created_at: date,
      updated_at: date,
      views: 1,
      favorites: 1,
      ...deConstructedStycker,
    });
    return res.status(200).json({ id: data.insertedId });
  } catch {
    console.log("Error");
    return res.status(400).send("Server Error");
  }
}
