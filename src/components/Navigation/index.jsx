/* eslint-disable camelcase */
import { easyLoadUser } from "@/backend/auth/easyGetUser";
import { isLoggedIn } from "@/backend/auth/isLoggedIn";
import { NavPages } from "@/config/defaults.config";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Center from "../Center";
import { useTheme } from "../Theme/state";
import { ProfileThemeToggle } from "./profileToggler";

export default function Navigation() {
  const [user, setUser] = useState({});
  const loggedIn = isLoggedIn(user);

  const supabase = useSupabaseClient();
  const supabaseUser = useUser();

  const cropped_name = `${user.full_name}`.split(" ")[0];

  useEffect(() => {
    if (supabaseUser) easyLoadUser(supabase, supabaseUser, setUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabaseUser]);

  const { mode } = useTheme();

  return (
    <header>
      <div className="border-b-neutral-focus" style={{ display: "none" }}>
        {" "}
        These invisible elements allow the dynamic classes to compile
      </div>
      <div className="border-b-base-300" style={{ display: "none" }}>
        {" "}
        These invisible elements allow the dynamic classes to compile{" "}
      </div>
      <div
        className={`bg-base-100 navbar relative border-b border-b-${
          mode === "dark" ? "neutral-focus" : "base-300"
        } border-dashed`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li tabIndex={0}>
                <a className="justify-between">
                  Parent
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link
            href="/"
            className="ml-10 px-2 btn btn-ghost normal-case text-xl"
          >
            <div className="relative">
              <div className="w-40 relative h-10">
                <Image
                  src={
                    mode === "dark" ? "/stycker_dark.svg" : "/stycker_light.svg"
                  }
                  alt="Stycker Logo"
                  fill
                />
              </div>
              <Image
                src="/stycker_dark.svg"
                alt="Stycker Logo"
                fill
                style={{ display: "none" }}
              />
              <Image
                src="/stycker_light.svg"
                alt="Stycker Logo"
                fill
                style={{ display: "none" }}
              />
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {NavPages.map((item) => {
              return item.children?.length && item.children.length > 0 ? (
                <li tabIndex={0} key={item.href}>
                  <Link href={item.href}>
                    {item.name}
                    <svg
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                  </Link>
                  <ul
                    className="border-b-neutral-focus"
                    style={{ display: "none" }}
                  >
                    {" "}
                    These invisible elements allow the dynamic classes to
                    compile
                  </ul>
                  <ul className="border-b-base-300" style={{ display: "none" }}>
                    {" "}
                    These invisible elements allow the dynamic classes to
                    compile{" "}
                  </ul>
                  <ul
                    className={`p-2 dropdown-content menu shadow bg-base-100 rounded-box z-10 border border-${
                      mode === "dark" ? "neutral-focus" : "base-300"
                    }`}
                  >
                    {item.children.map((item) => {
                      return (
                        <li key={item.href}>
                          <Link href={item.href}>{item.name}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="navbar-end">
          {
            // Disabling search bc it will be too difficult to implement in the given timeframe
            /*
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
          */
          }
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar mr-10"
            >
              <div className="w-10 rounded-full">
                {user?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user?.avatar_url} alt={`${user.name}'s avatar`} />
                ) : (
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                      <span className="text-2xl">
                        {user?.name
                          ? `${user?.name}`.charAt(0).toUpperCase()
                          : "S"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className={`mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 border border-${
                mode === "dark" ? "neutral-focus" : "base-300"
              }`}
            >
              <Center className={"text-sm py-1"}>
                {cropped_name === "undefined" ? (
                  <div>
                    Welcome,
                    <span className="font-bold ml-1">Stranger</span>
                  </div>
                ) : (
                  <div>
                    Hello,
                    <span className="font-bold ml-1">{cropped_name}</span>
                  </div>
                )}
              </Center>
              <ProfileThemeToggle />
              {loggedIn && (
                <div>
                  <li>
                    <Link href="/new">New Stycker</Link>
                  </li>
                  <li>
                    <Link href="/my">My Styckers</Link>
                  </li>
                  <li>
                    <Link href="/profile" className="justify-between">
                      Profile
                      <span className="badge badge-secondary badge-outline">
                        New
                      </span>
                    </Link>
                  </li>
                </div>
              )}
              <li>
                <Link href={loggedIn ? "/logout" : "/login"}>
                  {loggedIn ? "Logout" : "Login"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
