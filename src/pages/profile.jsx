import { easyLoadUser } from "@/backend/auth/easyGetUser";
import { updateProfile } from "@/backend/auth/updateProfile";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

import { DividerArea } from "@/components/DividerArea";
import Center from "@/components/Center";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { TextareaAutosize } from "@mui/base";

export default function ProfileExamplePage() {
  const [user, setUser] = useState({});

  const supabase = useSupabaseClient();
  const supabaseUser = useUser();

  useEffect(() => {
    if (supabaseUser) easyLoadUser(supabase, supabaseUser, setUser);
  }, [supabaseUser, supabase]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <div className="flex justify-center my-10">
        <div className="m-10">
          <div className="avatar">
            <div className="rounded">
              <Image
                src={user.avatar_url}
                alt="profile picture"
                width={400}
                height={200}
              />
            </div>
          </div>

          <div>
            <label
              className="mt-5 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              About Me
            </label>
            <TextareaAutosize
              className="textarea textarea-bordered w-3/12"
              placeholder="About Me"
              minRows={3}
              defaultValue={user.about_me}
              {...register("about_me")}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grow w-full max-w-lg mx-10"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full p-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-name"
              >
                Full Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-name"
                type="name"
                placeholder="Full Name"
                defaultValue={user.full_name}
                {...register("full_name")}
              />
            </div>

            <div className="w-full p-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-username"
              >
                Username
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-username"
                type="username"
                placeholder="Username"
                value={user.username}
              />
            </div>

            <div className="w-full p-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                placeholder="******************"
              />
            </div>

            <div className="w-full p-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-website"
              >
                Website
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-website"
                type="website"
                placeholder="Personal Website"
                value={user.website}
              />
            </div>
          </div>

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
            Edit Details
          </button>

          <button className="btn btn-error float-right">Delete Account</button>
        </form>
      </div>

      <DividerArea className="bg-base-100 h-14 sticky mt-12 top-0 z-10 border-y border-base-content border-dashed">
        <Center className={"mt-2"}>
          <div className="w-10/12 relative">
            <div className="h-12 absolute left-0">
              <label
                className="my-3 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                htmlFor="grid-first-name"
              >
                My Projects
              </label>
            </div>

            <div className="absolute inset-x-1/2">
              {/*
              Reserved for future use (positioned in center)
              */}
            </div>

            <div className="absolute right-0 mr-4 h-12 min-w-[12%]">
              <button className="btn -mt-1 btn-success">
                Create New Project
              </button>
            </div>
          </div>
        </Center>
      </DividerArea>
    </div>
  );
}
