import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginPage() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  // The following function checks to see if the user is already logged in
  // The session bracket ensures the function is only called when the session changes
  // If the user is already logged in, our temporary solution is to redirect them to the explore page
  useEffect(() => {
    if (session) {
      supabase.auth.signOut();
      router.reload();
    } else router.push("/");
  }, [router, session, supabase.auth]);

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="drop-shadow-xl flex flex-col w-[32rem] border-secondary border bg-base-200 rounded-2xl py-6">
          <div className="grid card rounded-box place-items-center">
            <h1 className="text-6xl font-bold">Logging out...</h1>
            <h2 className="text-3xl mt-2 mb-6">Signing out of your account</h2>
            <p className="mx-12 text-[0.1em]">
              If you are reading this text, I applaud you. You are one of the
              fastest readers alive, or our app is experiencing performance
              issues. I made this text to test the reading speed of people who
              made it to the log out page. I am interested to see how far you
              read, and if you are fast enough you might be able to copy my
              discord: ultracodez#2249. Feel free to ping me and tell me how far
              you read. Anyway, I wonder if one day someone will use the console
              to manually reach this page and post the entire easter egg online!
              It would be funny to appear on a news website or
              r/ProgrammerHumor! Anyways, I am getting bored of writing this so
              I&apos;m going to stop now, have fun being logged out, and come
              back soon! :){" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
