import { GithubLogo } from "@/components/Logo/Github";
import { GoogleLogo } from "@/components/Logo/Google";

export default function LoginPage() {
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
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered ring-transparent focus:border-secondary w-full max-w-xs focus:outline-0"
              />
            </div>

            <div className="mt-4 form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered ring-transparent focus:border-secondary w-full max-w-xs focus:outline-0"
              />
            </div>

            <button className="mt-6 btn btn-block btn-secondary max-w-xs">
              Sign In
            </button>
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
