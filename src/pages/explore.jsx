import { StyckerCard } from "@/components/StyckerCard";
import StackGrid from "react-stack-grid";
import { createSampleStyckerCardDataArray } from "../../.testing/createSampleStyckerCardData";

export default function ExplorePage() {
  return (
    <>
      <StackGrid columnWidth={"20%"}>
        {createSampleStyckerCardDataArray(20).map((sampleStyckerCardData) => {
          return (
            <>
              <StyckerCard
                user={{ name: sampleStyckerCardData.user.name }}
                title={sampleStyckerCardData.title}
                description={sampleStyckerCardData.description}
              />
            </>
          );
        })}
      </StackGrid>
      a a
    </>
  );
}
