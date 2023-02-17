import { easyLoadUser } from "@/backend/auth/easyGetUser";
import Center from "@/components/Center";
import { TextareaAutosize } from "@mui/base";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "react-hook-form";
import { useTheme } from "@/components/Theme/state";
import Image from "next/image";
import { AspectRatio } from "react-aspect-ratio";

export default function NewStycker() {
  const { mode } = useTheme();

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

  const [imageURL, setImageURL] = useState(null);
  const [rawImageURL, setRawImageURL] = useState(null);

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
          className="grow w-full max-w-lg "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border-neutral-focus" style={{ display: "none" }}>
            {" "}
            These invisible elements allow the dynamic classes to compile
          </div>
          <div className="border-base-300" style={{ display: "none" }}>
            {" "}
            These invisible elements allow the dynamic classes to compile{" "}
          </div>
          <Dropzone
            className={`rounded-xl bg-base-100 hover:bg-base-200 border-[1.5px] border-dashed border-${
              mode === "dark" ? "neutral-focus" : "base-300"
            }`}
            accept={IMAGE_MIME_TYPE}
            maxSize={3 * 1024 ** 2}
            multiple={false}
            onDrop={async (files) => {
              if (imageURL) {
                await supabase.storage.from("styckers").remove(rawImageURL);
              }

              const url = `${
                user.id
              }/${Math.random()}/${Date.now().toString()}`;
              const bannerImage = files[0];
              const { data, error } = await supabase.storage
                .from("styckers")
                .upload(url, bannerImage, {
                  cacheControl: "3600",
                  upsert: false,
                });
              if (error) {
                alert("Image failed to upload; Check console for more info");
                alert(JSON.stringify(error + " " + error.message + " " + url));
                console.error(error);
              } else if (data) {
                alert("Image uploaded successfully");
                setRawImageURL(data.path);
                setImageURL(
                  (
                    await supabase.storage
                      .from("styckers")
                      .getPublicUrl(data.path)
                  ).data.publicUrl
                );
              }
            }}
          >
            {!imageURL ? (
              <div className=" mx-2 py-16">
                <Center className={`text-2xl text-base-300`}>
                  Upload Banner
                </Center>

                <Center className={`text-md text-base-300`}>
                  Maximum size 5MB
                </Center>
              </div>
            ) : (
              <>
                <AspectRatio
                  ratio="16/9"
                  style={{
                    minWidth: "12rem",
                    maxWidth: "26rem" /* equivalent of tailwindCSS w-72 */,
                  }}
                >
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={imageURL}
                    alt="Banner image for your stycker"
                  />
                </AspectRatio>
              </>
            )}
          </Dropzone>
          <div className="w-full p-2 mt-4">
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
