import Center from "@/components/Center";
import { DividerArea } from "@/components/DividerArea";
import { StyckerCardWithFixedAdjustableHeight } from "@/components/StyckerCard";
import Select from "react-tailwindcss-select";
import { useEffect, useState } from "react";
import SelectStyle from "@/styles/SelectStyle";
import { sortByValues } from "@/config/enums/sortByValues";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { LinkWrapper } from "@/components/LinkWrapper";

const filterValues = [
  { value: "fox", label: "🦊 Fox" },
  { value: "Butterfly", label: "🦋 Butterfly" },
  { value: "Honeybee", label: "🐝 Honeybee" },
];
const itemsPerLoad = 50;

// DO NOT PUSH TO PROD
/*
const sampleStyckerCardDataArray = createSampleStyckerCardDataArray(
  itemsPerLoad,
  1,
  3
); 
*/

const fetchGetStyckers = async (skip, sortType) => {
  try {
    // alert(`skip${skip} & number ${itemsPerLoad} & sortType = ${sortType}`);
    const res = await fetch(
      `/api/getStyckers?skip=${skip}&number=${itemsPerLoad}&sortType=${sortType}`
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

export default function ExplorePage() {
  const [filters, setFilters] = useState(null);

  const handleFilterChange = (value) => {
    setFilters(value);
  };

  const [sortByValue, setSortByValue] = useState({
    value: "created_a",
    label: "Date Created (Ascending)",
  });

  const handleSortByValueChange = (value) => {
    setSortByValue(value);
  };

  const [styckerData, setStyckerData] = useState([]);

  // Preload data
  useEffect(() => {
    async function preloadData() {
      try {
        const res = await fetchGetStyckers(0, sortByValue.value);
        // alert(JSON.stringify(res));
        setStyckerData(res.data);
      } catch {}
    }
    preloadData();
  }, [sortByValue]);

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
            sortByValue.value
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
    <>
      <div className="h-20"></div>
      <Center>
        <h1 className="text-8xl font-bold">
          Explore <span className="text-secondary-focus">Stycker</span>s
        </h1>
      </Center>
      <Center className="mt-8">
        <p className="w-6/12 text-center text-lg">
          Find the very best ideas made by normal people like you! Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Quisque et vulputate
          dolor, at convallis felis. Vestibulum luctus iaculis suscipit. Sed
          tristique auctor purus in posuere. Vestibulum auctor vel lectus a
          dignissim. Curabitur ultrices ipsum consectetur, volutpat ante eu,
          consequat lectus. Nam dignissim, enim interdum imperdiet facilisis,
          nunc sem bibendum massa, vel mattis nisl eros sit amet turpis. Aenean
          placerat et diam et ornare. Curabitur ac elit dictum, blandit lectus
          sed, ultricies arcu. Ut a elementum nibh. Vestibulum posuere suscipit
          diam, molestie egestas sem semper consequat. Aenean nec lorem erat.
        </p>
      </Center>
      <DividerArea className="bg-base-100 h-14 sticky mt-12 top-0 z-10 border-y border-base-content border-dashed">
        <Center className={"mt-2"}>
          <div className="w-10/12 relative">
            <div className="h-12 absolute left-0">
              <Select
                value={filters}
                onChange={handleFilterChange}
                options={filterValues}
                isMultiple
                isSearchable
                classNames={SelectStyle}
              />
            </div>
            <div className="absolute inset-x-1/2">
              {/*
              Reserved for future use (positioned in center)
              */}
            </div>
            <div className="absolute right-0 mr-4 h-12 min-w-[12%]">
              <Select
                value={sortByValue}
                onChange={handleSortByValueChange}
                options={sortByValues}
                classNames={SelectStyle}
              />
              {
                // Default DaisyUI Select, unused
                /* <select className="select border-gray-300 hover:border-accent focus:border-accent-focus w-full max-w-xs ">
                <option>Date created</option>
                <option>Views</option>
                <option>Placeholder</option>
              </select> */
              }
            </div>
          </div>
        </Center>
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
                  <LinkWrapper
                    href={`/stycker/${cardData?._id}`}
                    key={cardData?._id}
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
    </>
  );
}
