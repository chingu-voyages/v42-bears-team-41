import { LinkWrapper } from "@/components/LinkWrapper";
import { StyckerCard } from "@/components/StyckerCard";

export default function TestingPage() {
  return (
    <>
      <LinkWrapper href="https://google.com" className="m-8">
        <StyckerCard
          title="Stycker Card Component"
          description={
            "This is a short sample description. This is a short sample description. This is a short sample description. This is a short sample description. This is a short sample description. This is a short sample description. This is a short sample description. This is a short sample description. This is a short sample description. This is a short sample description. This is a short sample description."
          }
          user={{ name: "Bryan Moore" }}
        />
      </LinkWrapper>
    </>
  );
}
