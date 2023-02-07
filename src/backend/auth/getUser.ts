import { SupabaseClient } from "@supabase/auth-helpers-react";

export interface User {
  id: string;
  updated_at: Date;
  username: string;
  full_name: string;
  avatar_url: string;
  website: string;
}

export async function TryGetUser(
  supabase: SupabaseClient
): Promise<User | null> {
  const res = await supabase
    .from("profiles")
    .select("id, username, avatar_url, website, full_name, updated_at, id");
  if (res.error) return null;
  const profile = res.data[0];
  const user = {
    id: profile.id,
    username: profile.username,
    avatar_url: profile.avatar_url,
    website: profile.website,
    full_name: profile.full_name,
    updated_at: profile.updated_at,
  };
  return user;
}

export async function GetUserOrThrow(supabase: SupabaseClient): Promise<User> {
  const res = await TryGetUser(supabase);
  if (res) return res;
  else throw res;
}
