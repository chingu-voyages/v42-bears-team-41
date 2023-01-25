/* eslint-disable @next/next/no-img-element */

import useDimensions from "react-cool-dimensions";

/**
 * Does something nifty.
 *
 * @param   props  An object containing the `title`, `description` and `user` displayed in the StyckerCard, as well as an `id` for identifying the StyckerCard. A `user` has a `name` and an optional `avatar_url`.
 * @returns The StyckerCard component
 */
export function StyckerCard({ title, description, user, tags }) {
  return (
    <>
      <div className="card card-bordered card-compact w-fit h-fit pb-2 px-1 bg-base-100 shadow-xl border-secondary">
        <div className="card-body">
          <div className="flex">
            <div className="flex auto w-18 mr-6 mt-2">
              <div class="flex flex-col w-12">
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
                <h4 className="mt-2 text-center text-sm font-semibold">
                  {user.name}
                </h4>
              </div>
            </div>
            <div className="flex-auto w-72">
              <h2 className="card-title">{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
        {/*
        <div className="card-actions justify-center">
          <div className="btn-group">
            <button className="btn btn-active">Button</button>
            <button className="btn">Button</button>

            <button className="btn">Button</button>
          </div>
        </div>
        */}
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
