/* eslint-disable @next/next/no-img-element */
export function StyckerCard(props) {
  return (
    <>
      <div className="card card-bordered card-compact w-fit h-fit pb-2 px-1 bg-base-100 shadow-xl border-secondary">
        <div className="card-body">
          <div className="flex">
            <div className="flex auto w-18 mr-6 mt-2">
              <div class="flex flex-col w-12">
                <div className="avatar flex justify-center">
                  <div className="w-12 rounded">
                    {props.user.avatar_url ? (
                      <img
                        src={props.user.avatar_url}
                        alt={`${props.user.name}'s avatar`}
                      />
                    ) : (
                      <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                          <span className="text-2xl">
                            {`${props.user.name}`.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <h4 className="mt-2 text-center text-sm font-semibold">
                  {props.user.name}
                </h4>
              </div>
            </div>
            <div className="flex-auto w-72">
              <h2 className="card-title">{props.title}</h2>
              <p>{props.description}</p>
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
