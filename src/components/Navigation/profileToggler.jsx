import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Center from "../Center";
import { useTheme } from "../Theme/state";

export function ProfileThemeToggle({ size = 20, ...props }) {
  const { mode, toggleTheme } = useTheme();
  // needed for Next.js SSR
  const [wrappedMode, setWrappedMode] = useState("light");

  useEffect(() => {
    setWrappedMode(mode);
  }, [mode]);

  return (
    <li {...props}>
      <button
        className="mb-0.5 border border-base-100 hover:border-accent rounded-full p-2 hover:bg-base-100 focus:bg-base-100 hover:focus:border-accent-focus focus:text-accent-focus text-accent "
        onClick={() => {
          toggleTheme();
        }}
      >
        {wrappedMode === "dark" ? (
          <Center>
            <IconSun size={size} className="inline mr-2" /> Switch to light
          </Center>
        ) : (
          <Center>
            <IconMoonStars size={size} className="inline mr-2" /> Switch to dark
          </Center>
        )}
      </button>
    </li>
  );
}
