import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTheme } from "../Theme/state";

export function ThemeToggle({ size = 20, ...props }) {
  const { actualMode, toggleTheme } = useTheme();
  // needed for Next.js SSR
  const [wrappedMode, setWrappedMode] = useState("light");

  useEffect(() => {
    setWrappedMode(actualMode);
  }, [actualMode]);

  return (
    <div {...props}>
      <button
        className="border-2 border-accent rounded-full p-1 focus:border-accent-focus focus:text-accent-focus text-accent "
        onClick={() => {
          toggleTheme();
        }}
      >
        {wrappedMode === "dark" ? (
          <IconSun size={size} />
        ) : (
          <IconMoonStars size={size} />
        )}
      </button>
    </div>
  );
}
