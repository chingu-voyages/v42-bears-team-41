import { GithubLogo } from "@/components/Logo/Github";
import { GoogleLogo } from "@/components/Logo/Google";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  // The following function checks to see if the user is already logged in
  // The session bracket ensures the function is only called when the session changes
  // If the user is already logged in, our temporary solution is to redirect them to the explore page
  useState(() => {
    if (session) router.push("/explore");
  }, [session]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function logIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    }
    if (data?.user?.id) {
      alert("success");
    }
  }

  return (
    <div className="flex h-screen">
      <div class="m-auto">
        <div className="drop-shadow-xl flex flex-col w-[32rem] border-secondary border bg-base-200 rounded-2xl py-8">
          <div className="grid card rounded-box place-items-center">
            <h1 className="text-4xl font-bold">
              Welcome to <span className="text-accent">Stycker</span>!
            </h1>
            <h2 className="text-xl mt-2">Sign in to your account</h2>
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

            <div className="mt-4 form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="••••••••"
                className="input input-bordered ring-transparent focus:border-secondary w-full max-w-xs focus:outline-0"
              />
            </div>

            <button
              onClick={logIn}
              className="mt-6 btn btn-block btn-secondary max-w-xs"
            >
              Sign In
            </button>

            <Link href="/signup" className="link text-sm mt-4">
              Need an account? Sign Up
            </Link>
            <Link href="/reset" className="link text-sm mt-2">
              Forgot your password?
            </Link>
          </div>
          <div className="divider my-6">OR</div>
          <div className="grid h-36 card rounded-box place-items-center">
            <button className="h-8 btn btn-block btn btn-outline btn-secondary max-w-xs ">
              <div className="relative flex justify-center h-full w-full">
                <GoogleLogo className="flex-none relative my-auto w-5 h-5" />
                <div className="flex-none relative my-auto  ml-3">
                  Continue With Google
                </div>
              </div>
            </button>
            <button className="h-8 btn btn-block btn btn-outline btn-secondary max-w-xs ">
              <div className="relative flex justify-center h-full w-full">
                <GithubLogo className="flex-none relative my-auto w-5 h-5" />
                <div className="flex-none relative my-auto  ml-3">
                  Continue With Github
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
