import { SupabaseClient, User } from "@supabase/supabase-js";
import CombineUsers from "./combineUsers";
import { TryGetUser } from "./getUser";

export async function easyLoadUser(
  supabase: SupabaseClient,
  supabaseUser: User,
  callback: Function,
  callback2?: Function
) {
  const u = await TryGetUser(supabase, supabaseUser.id);
  const uu = CombineUsers(u, supabaseUser);
  // check if user actually rxists
  if (u && uu.aud === "authenticated" && uu.id) {
    callback(uu);
    if (callback2) callback2(u);
  } else {
    callback(null);
    if (callback2) callback2(null);
  }
}
