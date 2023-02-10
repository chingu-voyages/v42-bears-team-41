import { User as SupabaseUser } from "@supabase/supabase-js";
import { User } from "./getUser";

export function isLoggedIn(user: SupabaseUser & User) {
  return user.aud === "authenticated";
}
