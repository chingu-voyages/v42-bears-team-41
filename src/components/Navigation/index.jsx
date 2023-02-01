import Link from "next/link";

export default function Navigation() {
  return (
    <header>
      <div className="bg-base-200 navbar">
        <ul className="inline-grid grid-cols-3 space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/explore">Explore</Link>
          </li>
          <li>
            <Link href="/">Signup</Link>
          </li>
        </ul>
        <div className="flex items-end">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
