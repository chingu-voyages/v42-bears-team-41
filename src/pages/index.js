import { LinkWrapper } from "@/components/LinkWrapper";
import { StyckerCard } from "@/components/StyckerCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [doubleSampleStyckerData, setDoubleSampleStyckerData] = useState([]);

  useEffect(() => {
    async function getDoubleSampleStyckerData() {
      try {
        const res = await fetch(`/api/getRandomStyckers?number=2`);
        const data = await res.json();
        setDoubleSampleStyckerData(data.data);
      } catch (err) {
        alert(JSON.stringify(err.message));
      }
    }
    getDoubleSampleStyckerData();
  }, []);

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content pr-8">
          <div className="flex">
            <div className="mt-2 flex-auto max-w-lg flex-col">
              <h1 className="text-6xl font-bold">
                Welcome to <span className="text-accent">Stycker!</span>
              </h1>
              <h2 className="font-bold text-xl mt-4">
                Find a project and make a contribution
              </h2>
              <p className="mt-2 mb-4 mr-8">
                We created Stycker so that you can find projects that interest
                you. Take a look around and find a project to contribute to, or
                add one and let others contribute.{" "}
              </p>
              <Link
                href="/explore"
                className="btn btn-sm btn-primary text-center text-sm"
              >
                Check It Out!
              </Link>
            </div>
            <div
              className="flex-auto w rounded-xl  border border-neutral bg-base-300"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, hsl(var(--nf)) 1px, transparent 0)",
                backgroundSize: "12px 12px",
              }}
            >
              <div className="px-4 py-4 ">
                <LinkWrapper href={doubleSampleStyckerData[1]?.href || "#"}>
                  <StyckerCard
                    title={doubleSampleStyckerData[0]?.title}
                    user={doubleSampleStyckerData[0]?.user}
                    description={doubleSampleStyckerData[0]?.description}
                  />
                </LinkWrapper>
                <div className="mt-8" />
                <LinkWrapper href={doubleSampleStyckerData[1]?.href || "#"}>
                  <StyckerCard
                    title={doubleSampleStyckerData[1]?.title}
                    user={doubleSampleStyckerData[1]?.user}
                    description={doubleSampleStyckerData[1]?.description}
                  />
                </LinkWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
