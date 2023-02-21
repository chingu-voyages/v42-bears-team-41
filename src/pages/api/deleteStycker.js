/* eslint-disable camelcase */
import { MongoSideProjectCollection } from "../../backend/db/StyckerData/sideProjects";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { easyLoadUserServer } from "../../backend/auth/easyGetUser";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const spCollection = await MongoSideProjectCollection();
  const { id } = req.query;

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

  const oldObject = await spCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!oldObject || !oldObject._id)
    return res.status(404).send("Stycker Not Found");
  if (!(suuser.id === oldObject.owner_user_id)) {
    return res.status(403).json({
      error: "forbidden",
      description: "The user does not match the user on file.",
    });
  }

  try {
    const data = await spCollection.deleteOne({
      _id: new ObjectId(objectToUpdate_id),
    });
    return res.status(200).json({ c: data.deletedCount });
  } catch (e) {
    console.log(e);
    console.log("Error");
    return res.status(400).send("Server Error");
  }
}
