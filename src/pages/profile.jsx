import { easyLoadUser } from "@/backend/auth/easyGetUser";
import { updateProfile } from "@/backend/auth/updateProfile";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function ProfileExamplePage() {
  const [user, setUser] = useState({});

  const supabase = useSupabaseClient();
  const supabaseUser = useUser();

  useEffect(() => {
    if (supabaseUser) easyLoadUser(supabase, supabaseUser, setUser);
  }, [supabaseUser]);

  return (
    <div>
      {JSON.stringify(user)}
      <button
        className="btn"
        onClick={() => {
          const user = {
            id: "e298331f-69c6-441f-8371-d4fb25fb6494",
            username: "ultra",
            avatar_url: "https://picsum.photos/500/500",
            website: "https://example.org",
            full_name: "Rando Person",
            updated_at: null,
            about_me: "I am a Rando Person",
            favorite_list: ["BSON"],
          };
          updateProfile(user, supabase);
        }}
      >
        a
      </button>
    </div>
  );
}
