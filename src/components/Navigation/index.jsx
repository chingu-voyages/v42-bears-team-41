import Link from "next/link";

export default function Navigation() {
  return (
    <header>
      <div className="bg-base-200 navbar">
        <div>
          <ul className="inline-grid grid-cols-8 space-x-4">
          <button className="btn btn-ghost">
            <li>
              <Link href="/">Home</Link>
            </li>
            </button>
            <button className="btn btn-ghost">
            <li>
              <Link href="/">Log in </Link>
            </li>
            </button>
            <button className="btn btn-ghost">
            <li>
              <Link href="/">Sign up</Link>
            </li>
            </button>
          </ul>
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
      </div>
    </header>
  );
}
