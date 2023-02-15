import { easyLoadUser } from "@/backend/auth/easyGetUser";
import Center from "@/components/Center";
import { TextareaAutosize } from "@mui/base";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

export default function NewStycker() {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {},
  });

  const [user, setUser] = useState({});
  const [rawUser, setRawUser] = useState({});

  const supabase = useSupabaseClient();
  const supabaseUser = useUser();

  useEffect(() => {
    if (supabaseUser) easyLoadUser(supabase, supabaseUser, setUser, setRawUser);
  }, [supabaseUser, supabase]);

  const onSubmit = (data) => {};

  return (
    <div className="w-full">
      <Center>
        <h1 className="text-5xl font-bold mt-10">
          Create a{" "}
          <span
            style={{
              background:
                "linear-gradient(to right, rgb(234, 4, 126),  rgb(249, 0, 191),rgb(89, 2, 236))",
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
            }}
          >
            Stycker
          </span>
        </h1>
      </Center>
      <Center className="w-full mt-10">
        <form
          className="grow w-full max-w-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full p-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-username"
            >
              Title
            </label>
            <input
              className="input input-bordered w-full "
              placeholder="Title"
              {...register("title")}
            />
          </div>
          <div className="w-full p-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Description
            </label>
            <TextareaAutosize
              className="w-full textarea textarea-bordered"
              placeholder="My Stycker is about..."
              minRows={3}
              {...register("description")}
            />
          </div>
          <div className="w-full p-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-username"
            ></label>
            <input
              className="input input-bordered w-full "
              placeholder="Title"
              {...register("title")}
            />
          </div>
          <div className="w-full p-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-username"
            >
              Title
            </label>
            <input
              className="input input-bordered w-full "
              placeholder="Title"
              {...register("title")}
            />
          </div>
        </form>
      </Center>
    </div>
  );
}
