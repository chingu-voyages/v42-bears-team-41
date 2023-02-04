import Center from "@/components/Center";
import { DividerArea } from "@/components/DividerArea";
import { StyckerCardWithFixedAdjustableHeight } from "@/components/StyckerCard";
import StackGrid from "react-stack-grid";
import { createSampleStyckerCardDataArray } from "../../.testing/createSampleStyckerCardData";
import Select from "react-tailwindcss-select";
import { useState } from "react";
import SelectStyle from "@/styles/SelectStyle";

const filterValues = [
  { value: "fox", label: "🦊 Fox" },
  { value: "Butterfly", label: "🦋 Butterfly" },
  { value: "Honeybee", label: "🐝 Honeybee" },
];
const sortByValues = [
  { value: "created", label: "Date Created" },
  { value: "views", label: "Views" },
  { value: "placeholder", label: "Placeholder" },
];

// DO NOT PUSH TO PROD
const sampleStyckerCardDataArray = createSampleStyckerCardDataArray(20, 1, 3);

export default function ExplorePage() {
  const [filters, setFilters] = useState(null);

  const handleFilterChange = (value) => {
    setFilters(value);
  };

  const [sortByValue, setSortByValue] = useState(null);

  const handleSortByValueChange = (value) => {
    setSortByValue(value);
  };

  const [styckerData] = useState(sampleStyckerCardDataArray);

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
          <StackGrid columnWidth={"30%"} gutterHeight={25}>
            {styckerData.map((cardData) => {
              return (
                <div key={cardData.id}>
                  <StyckerCardWithFixedAdjustableHeight
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
          </StackGrid>
          <div className="mt-10"></div>
        </div>
      </Center>
    </>
  );
}
