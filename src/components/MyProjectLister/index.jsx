import { DividerArea } from "../DividerArea";
import { Center } from "../Center";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { easyLoadUser } from "../../backend/auth/easyGetUser";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { StyckerCardWithFixedAdjustableHeight } from "../StyckerCard";
import { LinkWrapper } from "../LinkWrapper";

const itemsPerLoad = 50;

const fetchGetStyckers = async (skip, sortType, id) => {
  try {
    // alert(`skip${skip} & number ${itemsPerLoad} & sortType = ${sortType}`);
    const res = await fetch(
      `/api/getStyckers?skip=${skip}&number=${itemsPerLoad}&sortType=${sortType}&filter=${encodeURIComponent(
        JSON.stringify({ owner_user_id: id })
      )}`
    );
    const data = await res.json();
    // alert(JSON.stringify(data));a
    // alert("incoming data");
    // alert(JSON.stringify(data));
    return data;
  } catch (err) {
    // alert(JSON.stringify(err));
    console.log(err);
    throw err;
  }
};

export function MyProjectLister() {
  const [styckerData, setStyckerData] = useState([]);
  const [user, setUser] = useState({});

  const supabase = useSupabaseClient();
  const supabaseUser = useUser();

  useEffect(() => {
    if (supabaseUser) easyLoadUser(supabase, supabaseUser, setUser);
  }, [supabaseUser, supabase]);
  // Preload data
  useEffect(() => {
    async function preloadData() {
      try {
        const res = await fetchGetStyckers(
          0,
          "az" /* sortByValue.value */,
          user.id
        );
        // alert(JSON.stringify(res));
        setStyckerData(res.data);
      } catch {}
    }
    if (user) preloadData();
  }, [
    user.id,
    user,
    /* sortByValue */
  ]);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position =
      Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight) +
          Number.EPSILON) *
          1000
      ) / 1000; // window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [currentLoadedItems, setCurrentLoadedItems] = useState(itemsPerLoad);

  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  useEffect(() => {
    async function loadNewData() {
      try {
        if (scrollPosition >= 0.75 && !hasReachedEnd) {
          // alert("pls");
          // const newItems = createSampleStyckerCardDataArray(itemsPerLoad, 1, 3);
          const data = await fetchGetStyckers(
            currentLoadedItems,
            "az" /* sortByValue.value */,
            user.id
          );

          // alert("incoming new items");
          // alert(JSON.stringify(data));
          // alert(JSON.stringify(data.data));
          const newItems = data.data;

          if (newItems && newItems?.length && newItems.length === 0) {
            setHasReachedEnd(true);
            return;
          }
          if (!data || !newItems) return;

          // alert(JSON.stringify(newItems));
          setStyckerData(styckerData.concat(newItems));

          // use currentLoadedItems in api req
          setCurrentLoadedItems(currentLoadedItems + itemsPerLoad);
        } // alert("close to bottom");
      } catch (err) {
        // alert("Error loading more data: " + JSON.stringify(err));
        // alert(err);
        console.log(err);
      }
    }
    loadNewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition]);

  return (
    <div>
      <Center>
        <h1 className="text-5xl font-bold my-10">
          My{" "}
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
          s
        </h1>
      </Center>
      <DividerArea className="px-10 bg-base-100 h-16 sticky top-0 z-10 border-y border-base-content border-dashed flex justify-between">
        <label className="block uppercase my-auto tracking-wide text-base-content text-lg align-text-top font-bold">
          My Styckers
        </label>

        <Link href="/new" className="my-auto btn btn-success">
          Create New Stycker
        </Link>
      </DividerArea>
      <Center className="mt-12">
        <div className="w-10/12">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 600: 1, 950: 2, 1475: 3 }}
            className="flex justify-center"
          >
            <Masonry gutter="1.5rem" className="flex justify-center">
              {styckerData.map((cardData) => {
                return (
                  <div key={cardData?._id}>
                    <LinkWrapper
                      href={`/stycker/${cardData?._id}`}
                      className="flex justify-center"
                    >
                      <StyckerCardWithFixedAdjustableHeight
                        image={cardData?.image}
                        user={{
                          name: cardData?.user?.name,
                          avatar_url: cardData?.user?.avatar_url,
                        }}
                        title={cardData?.title}
                        description={cardData?.description}
                        tags={cardData?.tags}
                      />
                    </LinkWrapper>
                    <Link
                      href={`/edit/${cardData?._id}`}
                      className="mt-1 link flex justify-center"
                    >
                      Or click here to edit
                    </Link>
                  </div>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
          <Center className="mt-20">
            <div className="alert alert-success shadow-lg w-64 drop-shadow-xl ">
              <div>
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
                <span className="text-center">No more Styckers to show</span>
              </div>
            </div>
          </Center>
          <div className="mt-10"></div>
        </div>
      </Center>
    </div>
  );
}
export default MyProjectLister;
