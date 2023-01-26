/* eslint-disable @next/next/no-img-element */

import { AspectRatio } from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import useDimensions from "react-cool-dimensions";
import { Badge } from "../Badge";

/**
 * Does something nifty.
 *
 * @param   props  An object containing the `title`, `description` and `user` displayed in the StyckerCard, as well as an `id` for identifying the StyckerCard. A `user` has a `name` and an optional `avatar_url`.
 * @returns The StyckerCard component
 */
export function StyckerCard({ title, description, user, tags, image }) {
  return (
    <>
      <div className="card card-bordered card-compact w-fit h-fit pb-2 px-1 bg-base-100 shadow-xl border-secondary">
        <div className="card-body">
          <div className="flex">
            <div className="flex auto w-18 mr-4 mt-2">
              <div class="flex flex-col w-16">
                <div className="avatar flex justify-center">
                  <div className="w-12 rounded">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={`${user.name}'s avatar`}
                      />
                    ) : (
                      <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                          <span className="text-2xl">
                            {`${user.name}`.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <h4
                  className="mt-2 text-center text-sm font-semibold"
                  style={{ hyphens: "auto", wordBreak: "break-word" }}
                >
                  {user.name}
                </h4>
              </div>
            </div>
            <div className="flex-auto w-[17.5rem]">
              {image ? (
                <div className="pb-4">
                  <AspectRatio
                    ratio="16/9"
                    style={{
                      maxWidth: "18rem" /* equivalent of tailwindCSS w-72 */,
                    }}
                  >
                    <img
                      className="rounded-xl"
                      src={image}
                      alt={`Cover Image for ${title}`}
                    />
                  </AspectRatio>
                </div>
              ) : (
                <></>
              )}
              <h2 className="card-title">{title}</h2>
              <p>{description}</p>
            </div>
          </div>
          <div>
            {tags ? (
              <div className="flex flex-wrap mt-6 w-[22.5rem]">
                {tags.map((tag) => {
                  return (
                    <Badge color={"purple"} key={tag.text}>
                      {tag.text}
                    </Badge>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
/**
 * Wraps a StyckerCard in a wrapper that has a fixed height which fluctuates to fit the card
 *
 * @param   props The parameters to pass to the StyckerCard
 * @returns A StyckerCard component in a wrapper that has a fixed height which fluctuates to fit the card
 */
export function StyckerCardWithFixedAdjustableHeight(props) {
  const { observe, height } = useDimensions({
    onResize: ({ observe, unobserve, width, height, entry }) => {
      // Triggered whenever the size of the target is changed...

      unobserve(); // To stop observing the current target element
      observe(); // To re-start observing the current target element
    },
  });

  return (
    <div style={{ height: `${height}px` }}>
      <StyckerCard ref={observe} {...props} />
    </div>
  );
}
