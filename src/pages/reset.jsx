import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { getURL } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  // The following function checks to see if the user is already logged in
  // The session bracket ensures the function is only called when the session changes
  // If the user is already logged in, our temporary solution is to redirect them to the explore page
  useEffect(() => {
    if (session) router.push("/explore");
  }, [router, session]);

  const [email, setEmail] = useState("");

  async function resetPassword() {
    const { error } = supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getURL() + "/confirm-reset",
    });
    if (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?"
        );
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
  }, [supabase.auth]);

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="my-2 drop-shadow-xl flex flex-col w-[32rem] border-secondary border bg-base-200 rounded-2xl py-8">
          <div className="grid card rounded-box place-items-center">
            <h2 className="text-xl mt-2">Reset your password</h2>
            <div className="mt-4 form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input input-bordered ring-transparent focus:border-secondary w-full max-w-xs focus:outline-0"
              />
            </div>
            <button
              onClick={resetPassword}
              className="mt-6 btn btn-block btn-secondary max-w-xs"
            >
              Reset Password
            </button>
            <Link href="/login" className="link text-sm mt-4">
              Back to login
            </Link>
            <Link href="/signup" className="link text-sm mt-4">
              Need an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
