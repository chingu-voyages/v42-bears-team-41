import { easyLoadUser } from "@/backend/auth/easyGetUser";
import { updateProfile } from "@/backend/auth/updateProfile";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { DividerArea } from "@/components/DividerArea";
import Center from "@/components/Center";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { TextareaAutosize } from "@mui/base";
import useHover from "@react-hook/hover";
import { IconCamera } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function ProfileExamplePage() {
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const [user, setUser] = useState({});
  const [rawUser, setRawUser] = useState({});

  const supabase = useSupabaseClient();
  const supabaseUser = useUser();

  useEffect(() => {
    if (supabaseUser) easyLoadUser(supabase, supabaseUser, setUser, setRawUser);
  }, [supabaseUser, supabase]);

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${Math.random()}.${
        user.id
      }.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const userUpData = {
        id: user.id,
        avatar_url: (
          await supabase.storage.from("avatars").getPublicUrl(filePath)
        ).data.publicUrl,
      };
      updateProfile(userUpData, supabase);
      router.reload();
    } catch (error) {
      alert("Error uploading avatar!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: useMemo(() => {
      return rawUser;
    }, [rawUser]),
  });

  useEffect(() => {
    if (!isDirty) reset(rawUser);
  }, [rawUser]);

  const onSubmit = (data) => {
    updateProfile(data, supabase);
    router.reload();
  };

  const target = useRef(null);
  const isHoveringUnWrapped = useHover(target, {
    enterDelay: 0,
    leaveDelay: 0,
  });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsHovering(isHoveringUnWrapped);
  }, [isHoveringUnWrapped]);

  return (
    <div>
      <div className="flex justify-center my-10">
        <div className="m-10">
          <Center>
            <label className="avatar" htmlFor="single">
              <div
                className="w-96 h-96 rounded-full mx-auto relative"
                ref={target}
              >
                {user.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt="profile picture"
                    fill // required
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  "no avatar"
                )}
                {isHovering && (
                  <>
                    <div class="absolute inset-0 bg-base-100 bg-opacity-30 transition-opacity"></div>
                    <IconCamera className="text-base-100 w-1/2 h-1/2 absolute top-1/4 left-1/4" />
                  </>
                )}
              </div>
            </label>
            <input
              style={{
                visibility: "hidden",
                position: "absolute",
              }}
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </Center>
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
                className="input input-bordered w-full max-w-xs"
                id="grid-name"
                type="name"
                placeholder="Full Name"
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
                className="input input-bordered w-full max-w-xs"
                id="grid-username"
                type="username"
                placeholder="Username"
                value={user.username}
              />
            </div>

            {/*
            <div className="w-full p-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                className="input input-bordered w-full max-w-xs"
                id="grid-password"
                type="password"
                placeholder="******************"
              />
            </div>
  */}

            <div className="w-full p-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-website"
              >
                Website
              </label>
              <input
                className="input input-bordered w-full max-w-xs"
                id="grid-website"
                type="website"
                placeholder="Personal Website"
                {...register("website")}
              />
            </div>
            <div className="w-full p-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                About Me
              </label>
              <TextareaAutosize
                className="w-full textarea textarea-bordered"
                placeholder="About Me"
                minRows={3}
                {...register("about_me")}
              />
            </div>

            <div className="w-full p-2 flex justify-between">
              <input
                type="submit"
                className="btn btn-primary"
                disabled={!isDirty}
                value="Save changes"
              />

              <button className="btn btn-error" type="button">
                Delete Account
              </button>
            </div>
          </div>
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
