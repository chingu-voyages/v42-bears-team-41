import { User as SupabaseUser } from "@supabase/supabase-js";
import { User } from "./getUser";

export default function CombineUsers(
  user: User,
  supabaseUser: SupabaseUser
): User & SupabaseUser {
  return Object.assign({}, user, supabaseUser);
}
export { CombineUsers };
