import { DarkTheme, LightTheme } from "@/config/defaults.config";
import { setCookie } from "cookies-next";
import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ defaultTheme, children }) => {
  const [theme, setThemeOrigin] = useState(defaultTheme);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const mode = theme === DarkTheme ? "dark" : "light";

  useEffect(() => {
    if (!hasUserInteracted) {
      setThemeOrigin(defaultTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTheme]);

  const setTheme = (theme, isUserInvoked = false) => {
    setThemeOrigin(theme);
    setCookie("mantine-color-scheme", theme === DarkTheme ? "dark" : "light", {
      maxAge: 60 * 60 * 24 * 30,
    });
    if (isUserInvoked) setHasUserInteracted(true);
  };

  const toggleTheme = () => {
    setTheme(mode === "dark" ? LightTheme : DarkTheme);
    if (mode === "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.style.setProperty(
        "background-color",
        "hsl(var(--b1))"
      );
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.style.setProperty(
        "background-color",
        "hsl(var(--b1))"
      );
    }

    setHasUserInteracted(true);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
