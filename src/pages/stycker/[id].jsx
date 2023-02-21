/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
// import { useEffect, useState } from "react";
import {
  IconBrandCashapp,
  IconBrandGithub,
  IconCup,
  IconLink,
} from "@tabler/icons-react";
import { createSampleStyckerCardDataArray } from "../../../.testing/createSampleStyckerCardData";
import { StyckerCard } from "@/components/StyckerCard";
import { useTheme } from "@/components/Theme/state";
import Link from "next/link";
import { MongoSideProjectCollection } from "../../backend/db/StyckerData/sideProjects";
import { ObjectId } from "mongodb";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const spCollection = await MongoSideProjectCollection();

  if (!id || !ObjectId.isValid(id)) return { props: { error: "invalid_id" } };

  const data = await spCollection.findOne(
    { _id: new ObjectId(id) }
    // { projection: { _id: 0 } }
  );
  const { updated_at, created_at, _id, ...otherProps } = data;

  // const userOwnerData =

  let styckerData = await spCollection
    .find({
      owner_user_id: otherProps.owner_user_id,
    })
    .toArray();

  styckerData = styckerData.map((doc) => {
    const { updated_at, created_at, _id, ...otherDocProps } = doc;
    return {
      updated_at: updated_at?.toString() ?? null,
      created_at: created_at?.toString() ?? null,
      _id: _id.toJSON(),
      ...otherDocProps,
    };
  });

  return {
    props: {
      user: { name: "hi", about_me: null, avatar_url: null },
      styckerData,
      data: {
        updated_at: updated_at?.toString() ?? null,
        created_at: created_at?.toString() ?? null,
        _id: _id.toJSON(),
        ...otherProps,
      },
    }, // will be passed to the page component as props
  };
}

export default function ExpandedPage({ styckerData, data, user, error }) {
  // const [styckerData] = useState(sampleStyckerCardDataArray);
  const { mode } = useTheme();

  // const router = useRouter();
  // const { id } = router.query;

  // const [wrappedMode, setWrappedMode] = useState("light");

  /* useEffect(() => {
    setWrappedMode(mode);
    setTimeout(() => {
      setWrappedMode(mode);
    }, 300);
  }, [mode]); */

  // const [data, setData] = useState(null);
  // Preload data
  /* useEffect(() => {
    async function preloadData() {
      if (!id) return;
      try {
        const res = await fetch(`/api/getStycker?id=${id}`);
        const data = await res.json();
        // alert(JSON.stringify(res));
        setData(data.data);
      } catch (err) {
        console.log(err);
        setData(null);
      }
    }
    if (!id || id.length < 12) setData(null);
    else preloadData();
  }, [id]); */

  return data ? (
    <div className="bg-base-100">
      <div className="flex mx-5 xl:mx-20">
        <div className="grid h-fit w-9/12 flex-auto card rounded-box ">
          <div style={{ display: "none" }} className="alert-info">
            These invisible elements allow the dynamic classes to compile
          </div>
          <div style={{ display: "none" }} className="alert-warning">
            These invisible elements allow the dynamic classes to compile
          </div>
          <div style={{ display: "none" }} className="alert-success">
            These invisible elements allow the dynamic classes to compile
          </div>

          <div
            className={`alert alert-${
              data.status === "awaiting_contribution"
                ? "info"
                : data.status === "completed"
                ? "success"
                : "warning"
            } shadow-md my-4`}
          >
            <div>
              {data.status === "awaiting_contribution" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              ) : data.status === "completed" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              )}
              <span>
                {data.status === "awaiting_contribution"
                  ? "This project is awaiting contribution"
                  : data.status === "completed"
                  ? "This project has been completed!"
                  : "This project is in progress."}
              </span>
            </div>
          </div>
          <div
            className={`py-4 flex-auto w rounded-xl border bg-base-100`}
            style={{
              borderColor:
                mode === "dark" ? "hsl(var(--nf))" : "hsl(var(--b3))",
              backgroundImage: `radial-gradient(circle at 2px 2px, ${
                mode === "dark" ? "hsl(var(--nf))" : "hsl(var(--b3))"
              } 1px, transparent 0)`,
              backgroundSize: "12px 12px",
              ...(data?.imageURL ? {} : { display: "none" }),
            }}
          >
            <div className=" justify-center my-2 flex space-x-8">
              {data?.imageURL && data?.imageURL.length > 0 ? (
                <img
                  src={data?.imageURL}
                  className="rounded-lg max-w-sm md:max-w-lg  shadow-2xl"
                  alt="Stycker cover image"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className=" flex flex-wrap relative ">
            <h1 className="text-5xl font-bold left-0 mt-2">{data.title}</h1>

            <div className="absolute right-0 space-x-4 ">
              {data?.contribution_links?.map((item) => {
                return (
                  <Link
                    key={item.icon_url + item.url + item.display_name}
                    href={item.url}
                    className="btn btn-outline hover:text-neutral-content sm:btn-xs md:btn-sm  lg:btn my-4"
                  >
                    {item.icon_url === "github" ? (
                      <IconBrandGithub
                        size={"1.5em"}
                        className="mb-0.5 mr-1.5"
                      />
                    ) : item.icon_url === "buymeacoffee" ? (
                      <IconCup size={"1.5em"} className="mb-0.5 mr-1.5" />
                    ) : item.icon_url === "cashlink" ? (
                      <IconBrandCashapp
                        size={"1.5em"}
                        className="mb-0.5 mr-1.5"
                      />
                    ) : (
                      <IconLink size={"1.5em"} className="mb-0.5 mr-1.5" />
                    )}
                    {item.display_name}
                  </Link>
                );
              })}
            </div>
          </div>
          <p className="py-6">{data?.description}</p>
          <div>
            <ul>
              {data?.contribution_links?.map((item) => {
                return (
                  <Link
                    href={item.url}
                    key={item.icon_url + item.url + item.display_name}
                  >
                    {item.display_name}
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
        <div style={{ display: "none" }} className="border-neutral-focus">
          These invisible elements allow the dynamic classes to compile
        </div>
        <div style={{ display: "none" }} className="border-base-300">
          These invisible elements allow the dynamic classes to compile
        </div>
        <div className="hidden xl:block divider divider-horizontal h-full min-h-screen"></div>
        <div className="hidden xl:block mt-6 grid h-20 flex-auto w-3/12 card  rounded-box place-items-center">
          <div
            className={`card w-96 border border-${
              mode === "dark" ? "neutral-focus" : "base-300"
            }`}
          >
            {user.avatar_url ? (
              <figure>
                <img src={user.avatar_url} alt={user.name + "'s Avatar"} />
              </figure>
            ) : (
              ""
            )}
            <div className="card-body">
              <h2 className="card-title">{user.name}</h2>
              <p>{user?.about_me || "This user has no about me."}</p>
            </div>
          </div>
          <div className="divider">
            <span>
              More by <span className="italic">{user.name}</span>
            </span>
          </div>
          <div>
            <div className="w-10/12 mt-2 ">
              {styckerData.slice(0, 5).map((cardData) => {
                return (
                  <div key={cardData.id} className="mt-4">
                    <StyckerCard
                      image={cardData.image}
                      user={{
                        name: cardData.user.name,
                        avatar_url: cardData.user.avatar_url,
                      }}
                      title={cardData.title}
                      description={cardData.description}
                      tags={cardData.tags}
                    />
                  </div>
                );
              })}
            </div>
            <Link href="#" className="flex justify-center">
              <div className="link relative text-center my-6">
                <span className="relative">
                  See more{"ㅤ"}
                  <IconLink
                    size={"1em"}
                    className="inline-flex self-center absolute mt-1 left-[4.3rem]"
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="xl:hidden mt-6 grid h-20 flex-auto card  rounded-box place-items-center">
        <div
          className={`card mx-8 sm:w-2/3 md:w-1/2 border border-${
            mode === "dark" ? "neutral-focus" : "base-300"
          }`}
        >
          <figure>
            <img
              src="https://img.freepik.com/free-psd/business-man-illustration_1150-59058.jpg?size=626&ext=jpg&uid=R92014609&ga=GA1.1.944852265.1675451112&semt=sph"
              alt="car!"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{user.name}</h2>
            <p>{user?.about_me || "This user has no about me."}</p>
          </div>
        </div>
        <div className="divider">
          <span>
            More by <span className="italic">{user.name}</span>
          </span>
        </div>
        <div>
          <div className="w-10/12 mt-2 ">
            {styckerData.slice(0, 5).map((cardData) => {
              return (
                <div key={cardData.id} className="mt-8">
                  <StyckerCard
                    image={cardData.image}
                    user={{
                      name: cardData.user.name,
                      avatar_url: cardData.user.avatar_url,
                    }}
                    title={cardData.title}
                    description={cardData.description}
                    tags={cardData.tags}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Link href="#">
          <div className="link text-center my-6">
            <span className="relative">
              See more{"ㅤ"}
              <IconLink
                size={"1em"}
                className="inline-flex self-center absolute mt-1 left-[4.3rem]"
              />
            </span>
          </div>
        </Link>
      </div>
    </div>
  ) : (
    <div className="grid h-screen px-4 bg-base-100 place-content-center">
      <div className="text-center">
        <div style={{ display: "none" }} className="text-neutral-focus">
          These invisible elements allow the dynamic classes to compile
        </div>
        <div style={{ display: "none" }} className="text-base-300">
          These invisible elements allow the dynamic classes to compile
        </div>
        <h1
          className={`font-black text-${
            mode === "dark" ? "neutral-focus" : "base-300"
          } text-9xl`}
        >
          404
        </h1>

        <p className="text-2xl font-bold tracking-tight text-base-content sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-base-content">We can&apos;t find that page.</p>

        <a
          href="#"
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
