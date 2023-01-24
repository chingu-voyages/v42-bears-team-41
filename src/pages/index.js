export default function Home() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content pr-8">
          <div className="max-w-md flex-col">
            <h1 className="text-3xl font-bold">Welcome to Stycker!</h1>
            <h2 className="font-bold">
              Find a project and make a contribution
            </h2>
            <p className="py-6 pr-8">
              We created Sycker so that you can find projects that interest you.
              Take a look around and find a project to contribute to, or add one
              and let others contribute.{" "}
            </p>
            <button className="btn btn-primary text-center">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}
