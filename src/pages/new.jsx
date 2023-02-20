/* eslint-disable no-unused-vars */
import { easyLoadUser } from "@/backend/auth/easyGetUser";
import Center from "@/components/Center";
import { TextareaAutosize } from "@mui/base";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "@/components/Theme/state";
import Image from "next/image";
import { AspectRatio } from "react-aspect-ratio";

import Select from "react-tailwindcss-select";
import SelectStyle from "@/styles/SelectStyle";
import { filterValues } from "@/config/defaults.config";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import LinkCafe from "@/components/LinkCafe";

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client

  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

export default function NewStycker() {
  const { mode } = useTheme();

  const {
    register,
    control,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const [user, setUser] = useState({});
  // const [rawUser, setRawUser] = useState({});

  const [filters, setFilters] = useState(null);

  const handleFilterChange = (value) => {
    setFilters(value);
  };

  const [imageURL, setImageURL] = useState(null);
  const [rawImageURL, setRawImageURL] = useState(null);

  const supabase = useSupabaseClient();
  const supabaseUser = useUser();

  const router = useRouter();

  useEffect(() => {
    if (supabaseUser)
      easyLoadUser(supabase, supabaseUser, setUser /* setRawUser */);
  }, [supabaseUser, supabase]);

  const [disabled, setIsDisabled] = useState(false);

  const onSubmit = (data) => {
    async function createNewStyckerWithProvidedProps(sende) {
      try {
        const data = await (
          await fetch(
            `/api/createStycker?styckerJSON=${encodeURIComponent(
              JSON.stringify(sende)
            )}`
          )
        ).json();
        if (data.id) router.push(`/stycker/${data.id} `);
        else {
          alert(
            "Your Stycker could not be created at this time, please try again later."
          );
          console.log(data);
          setIsDisabled(true);
          setTimeout(() => {
            setIsDisabled(false);
          }, 5000);
        }
      } catch (e) {
        alert(
          "Your Stycker could not be created at this time, please try again later."
        );
        console.log(e);
        setIsDisabled(true);
        setTimeout(() => {
          setIsDisabled(false);
        }, 5000);
      }
    }
    createNewStyckerWithProvidedProps({ data, imageURL });
  };

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
            className={`rounded-xl bg-base-100 hover:bg-base-200 border-[2px] border-dashed border-${
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
                <div className="text-neutral" style={{ display: "none" }}>
                  {" "}
                  These invisible elements allow the dynamic classes to compile
                </div>
                <div className="text-base-300" style={{ display: "none" }}>
                  {" "}
                  These invisible elements allow the dynamic classes to compile{" "}
                </div>
                <Center
                  className={`text-2xl text-${
                    mode === "dark" ? "text-neutral" : "text-base-300 "
                  }`}
                >
                  Upload Banner
                </Center>

                <Center
                  className={`text-md text-${
                    mode === "dark" ? "text-neutral" : "text-base-300 "
                  }`}
                >
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
              {...register("title", { required: true, minLength: 5 })}
            />
            {errors.title && (
              <p className="text-error">
                {
                  "This property is required and has a minimum length of five characters"
                }
              </p>
            )}
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
              {...register("description", { required: true })}
              aria-invalid={errors.description ? "true" : "false"}
            />
            {errors.description && (
              <p className="text-error">{"This property is required."}</p>
            )}
          </div>
          <div className="w-full p-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Tags
            </label>
            <Select
              value={filters}
              onChange={handleFilterChange}
              options={filterValues}
              isMultiple
              isSearchable
              classNames={SelectStyle}
            />
          </div>
          <div className="w-full p-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Status
            </label>
            <Controller
              control={control}
              name="status"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  options={[
                    { value: "in_progress", label: "In Progress" },
                    {
                      value: "awaiting_contribution",
                      label: "Awaiting Contribution",
                    },
                  ]}
                  classNames={SelectStyle}
                />
              )}
            />
          </div>
          <div className="w-full p-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Contribution Links
            </label>
            {}
            <Controller
              control={control}
              defaultValue={[]}
              rules={{
                validate: (value, formValues) => {
                  return value.every((value) => {
                    return (
                      value.text &&
                      value.type &&
                      value.text.length > 0 &&
                      value.type !== "invalid"
                    );
                  });
                },
              }}
              name="contribution_links"
              render={({ field: { value, onChange } }) => (
                <LinkCafe value={value} onChange={onChange} />
              )}
            />
            {errors.contribution_links && (
              <p className="text-error mt-2">{"Invalid Contribution Links."}</p>
            )}
          </div>
          <div className="w-full p-2">
            <button
              type="submit"
              disabled={disabled}
              className="mt-2 btn btn-block btn-secondary"
            >
              Create Stycker
            </button>
          </div>
        </form>
      </Center>
    </div>
  );
}
