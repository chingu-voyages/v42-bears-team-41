import { easyLoadUser } from "@/backend/auth/easyGetUser";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function ProfileExamplePage() {
  const [user, setUser] = useState({});

  const supabase = useSupabaseClient();
  const supabaseUser = useUser();

  useEffect(() => {
    easyLoadUser(supabase, supabaseUser, setUser);
  }, [supabaseUser]);

  return <div>{JSON.stringify(user)}</div>;
}
