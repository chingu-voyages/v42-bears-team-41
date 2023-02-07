import { SupabaseClient } from "@supabase/auth-helpers-react";

export interface User {
  id: string;
  updated_at: string;
  username: string;
  full_name: string;
  avatar_url: string;
  website: string;
  about_me: string;
  favorite_list: any;
}

export async function TryGetUser(
  supabase: SupabaseClient,
  id: string
): Promise<User | null> {
  const res = await supabase
    .from("profiles")
    .select(
      "id, username, avatar_url, website, full_name, updated_at, id, favorite_list, about_me"
    )
    .eq("id", id)
    .single();
  if (res.error) return null;
  const profile = res.data;
  const user = {
    id: profile.id,
    username: profile.username,
    avatar_url: profile.avatar_url,
    website: profile.website,
    full_name: profile.full_name,
    updated_at: profile.updated_at,
    about_me: profile.about_me,
    favorite_list: profile.favorite_list,
  };
  return user;
}

export async function GetUserOrThrow(
  supabase: SupabaseClient,
  id
): Promise<User> {
  const res = await TryGetUser(supabase, id);
  if (res) return res;
  else throw res;
}
