import Center from "@/components/Center";
import { DividerArea } from "@/components/DividerArea";
import { StyckerCardWithFixedAdjustableHeight } from "@/components/StyckerCard";
import StackGrid from "react-stack-grid";
import { createSampleStyckerCardDataArray } from "../../.testing/createSampleStyckerCardData";
import Select from "react-tailwindcss-select";
import { useState } from "react";

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
export default function ExplorePage() {
  const [filters, setFilters] = useState(null);

  const handleFilterChange = (value) => {
    setFilters(value);
  };

  const [sortByValue, setSortByValue] = useState(null);

  const handleSortByValueChange = (value) => {
    setSortByValue(value);
  };

  return (
    <>
      <Center className="mt-20">
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
      <DividerArea className="h-14 mt-6 sticky top-0 z-10 border-y border-accent">
        <Center className={"mt-2"}>
          <div className="w-10/12 relative">
            <div className="h-12 absolute left-0">
              <Select
                value={filters}
                onChange={handleFilterChange}
                options={filterValues}
                isMultiple
                isSearchable
                classNames={{
                  menuButton: ({ isDisabled }) =>
                    `flex text-sm text-neutral-content border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                      isDisabled
                        ? "bg-gray-200"
                        : "bg-base-100  focus:border-accent-focus focus:ring focus:ring-blue-500/20" // Removed hover:border-accent because of bug
                    }`,
                  menu: "absolute z-10 w-full bg-base-100 shadow-lg border border-accent rounded py-1 mt-1.5 text-sm text-neutral-content",
                  searchBox:
                    "w-full py-2 pl-8 text-sm text-gray-500 bg-base-100 border border-accent rounded focus:border-accent-focus focus:ring-0 focus:outline-none",
                  listItem: ({ isSelected }) =>
                    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                      isSelected
                        ? `text-neutral-content bg-blue-500`
                        : `text-neutral-content hover:bg-base-content hover:text-neutral`
                    }`,
                  tagItemText:
                    "text-neutral-content truncate cursor-default select-none",
                  tagItem: ({ isDisabled }) => {
                    const baseClass =
                      "bg-base-100 border rounded-sm flex space-x-1";
                    const disabledClass = isDisabled
                      ? "border-gray-500 px-1"
                      : "pl-1";
                    return `${baseClass} ${disabledClass}`;
                  },
                  tagItemIconContainer:
                    "flex items-center px-1 cursor-pointer rounded-r-sm  hover:text-error",
                }}
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
                classNames={{
                  menuButton: ({ isDisabled }) =>
                    `flex text-sm text-neutral-content border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                      isDisabled
                        ? "bg-gray-200"
                        : "bg-base-100  focus:border-accent-focus focus:ring focus:ring-blue-500/20" // Removed hover:border-accent because of bug
                    }`,
                  menu: "absolute z-10 w-full bg-base-100 shadow-lg border border-accent rounded py-1 mt-1.5 text-sm text-neutral-content",
                  searchBox:
                    "w-full py-2 pl-8 text-sm text-gray-500 bg-base-100 border border-accent rounded focus:border-accent-focus focus:ring-0 focus:outline-none",
                  listItem: ({ isSelected }) =>
                    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                      isSelected
                        ? `text-info-content bg-info`
                        : `text-neutral-content hover:bg-base-content hover:text-neutral`
                    }`,
                  tagItemText:
                    "text-neutral-content truncate cursor-default select-none",
                  tagItem: ({ isDisabled }) => {
                    const baseClasse =
                      "bg-base-100 border rounded-sm flex space-x-1";
                    const disabledClass = isDisabled
                      ? "border-gray-500 px-1"
                      : "pl-1";
                    return `${baseClasse} ${disabledClass}`;
                  },
                  tagItemIconContainer:
                    "flex items-center px-1 cursor-pointer rounded-r-sm  hover:text-error",
                }}
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
          <StackGrid columnWidth={"30%"} gutterHeight={40}>
            {createSampleStyckerCardDataArray(20).map(
              (sampleStyckerCardData) => {
                return (
                  <div key={sampleStyckerCardData.id}>
                    <StyckerCardWithFixedAdjustableHeight
                      user={{ name: sampleStyckerCardData.user.name }}
                      title={sampleStyckerCardData.title}
                      description={sampleStyckerCardData.description}
                    />
                  </div>
                );
              }
            )}
          </StackGrid>
          <div className="mt-10"></div>
        </div>
      </Center>
    </>
  );
}
