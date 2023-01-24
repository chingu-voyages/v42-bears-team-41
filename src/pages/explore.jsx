import Center from "@/components/Center";
import { DividerArea } from "@/components/DividerArea";
import { StyckerCardWithFixedAdjustableHeight } from "@/components/StyckerCard";
import StackGrid from "react-stack-grid";
import { createSampleStyckerCardDataArray } from "../../.testing/createSampleStyckerCardData";

export default function ExplorePage() {
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
      <DividerArea className="h-14 sticky top-0 z-10">
        <Center>
          <div className="w-10/12 relative">
            <div className="absolute left-0">a</div>
            <div className="absolute inset-x-1/2">b</div>
            <div className="absolute right-0 mr-4">
              <select className="select select-accent w-full max-w-xs ">
                <option>Date created</option>
                <option>Views</option>
                <option>Placeholder</option>
              </select>
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
        </div>
      </Center>
    </>
  );
}
