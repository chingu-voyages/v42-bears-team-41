import { useState } from "react";
import {
  IconBrandCashapp,
  IconBrandGithub,
  IconCup,
} from "@tabler/icons-react";
import { createSampleStyckerCardDataArray } from "../../../.testing/createSampleStyckerCardData";
import { StyckerCard } from "@/components/StyckerCard";
import { useTheme } from "@/components/Theme/state";

// DO NOT PUSH TO PROD
const sampleStyckerCardDataArray = createSampleStyckerCardDataArray(20, 1, 3);

export default function ExpandedPage() {
  const [styckerData] = useState(sampleStyckerCardDataArray);
  const { mode } = useTheme();

  return (
    <div className="bg-base-100">
      <div className="flex mx-20">
        <div className="grid h-20 flex-grow card rounded-box ">
          <div
            className={`mt-6 py-4 flex-auto w rounded-xl border bg-base-100`}
            style={{
              borderColor:
                mode === "dark" ? "hsl(var(--nf))" : "hsl(var(--b3))",
              backgroundImage: `radial-gradient(circle at 2px 2px, ${
                mode === "dark" ? "hsl(var(--nf))" : "hsl(var(--b3))"
              } 1px, transparent 0)`,
              backgroundSize: "12px 12px",
            }}
          >
            <div className=" justify-center my-2 flex space-x-8">
              <img
                src="https://images.unsplash.com/photo-1655720842809-0db94ab43f02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                className="rounded-lg max-w-sm md:max-w-lg  shadow-2xl"
              />
            </div>
          </div>
          <div className=" flex flex-wrap relative mt-2">
            <h1 className="text-5xl font-bold left-0 mt-3">A Project</h1>

            <div className="absolute right-0 space-x-4 ">
              <button className="btn btn-outline hover:text-neutral-content sm:btn-xs md:btn-sm  lg:btn my-4">
                Donate
                <IconBrandCashapp size={20} />
              </button>
              <button className="btn btn-outline hover:text-neutral-content sm:btn-xs md:btn-sm  lg:btn  my-4 ">
                Buy Me a Coffee
                <IconCup />
              </button>
              <button className="btn btn-outline hover:text-neutral-content gap-2 sm:btn-xs md:btn-sm  lg:btn  my-4 ">
                Contribute
                <IconBrandGithub size={20} />
              </button>
            </div>
          </div>
          <p className="py-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas
            accumsan lacus vel facilisis volutpat est velit egestas dui. At
            elementum eu facilisis sed odio. At volutpat diam ut venenatis
            tellus in metus vulputate. .
          </p>
          <div>
            <ul>
              <li>Project Links</li>
              <li>GitHub</li>
              <li>Buy Me a Coffee</li>
            </ul>
          </div>
        </div>
        <div style={{ display: "none" }} className="border-neutral-focus">
          These invisible elements allow the dynamic classes to compile
        </div>
        <div style={{ display: "none" }} className="border-base-300">
          These invisible elements allow the dynamic classes to compile
        </div>
        <div className="divider divider-horizontal h-full min-h-screen"></div>
        <div className="mt-6 grid h-20 flex-grow card  rounded-box place-items-center">
          <div
            className={`card w-96 border border-${
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
              <h2 className="card-title">Owner Name</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit netus
                litora purus, mi tincidunt lobortis parturient integer porttitor
                vivamus vulputate urna leo penatibus, commodo euismod donec
                ornare per felis fusce ut enim.
              </p>
            </div>
          </div>
          <div className="divider">
            <span>
              More by <span className="italic">Owner Name</span>
            </span>
          </div>
          <div>
            <div className="w-10/12 mt-2 ">
              {styckerData.map((cardData) => {
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
          </div>
        </div>
      </div>
    </div>
  );
}
