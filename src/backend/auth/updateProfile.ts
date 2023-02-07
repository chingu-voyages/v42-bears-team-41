import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "./getUser";

export async function updateProfile(user: User, supabase: SupabaseClient) {
  try {
    const updates: User = user;
    updates.updated_at = new Date().toISOString();

    let { error } = await supabase.from("profiles").upsert(updates);
    if (error) throw error;
    alert("Profile updated!");
  } catch (error) {
    alert("Error updating the data!");
    console.log(error);
  }
}
