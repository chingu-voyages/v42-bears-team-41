export function StyckerCard(props) {
  return (
    <>
      <div className="card card-bordered card-compact w-96 bg-base-100 shadow-xl border-secondary">
        <div className="card-body">
          <div className="flex">
            <div className="flex auto w-18 mr-4 mt-2">
              <div class="flex flex-col w-12">
                <div className="avatar flex justify-center">
                  <div className="w-12 rounded">
                    <img
                      src="https://placeimg.com/192/192/people"
                      alt="Tailwind-CSS-Avatar-component"
                    />
                  </div>
                </div>
                <h4 className="mt-2 text-center text-sm font-semibold">
                  John Turner
                </h4>
              </div>
            </div>
            <div className="flex-auto w-64">
              <h2 class="card-title">{props.title}</h2>
              <p>
                This is a very long description that showcases the Stycker Card
                component. This is a very long description that showcases the
                Stycker Card component. This is a very long description that
                showcases the Stycker Card component. This is a very long
                description that showcases the Stycker Card component. This is a
                very long description that showcases the Stycker Card component.
              </p>
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
