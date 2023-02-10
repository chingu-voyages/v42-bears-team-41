import { DarkTheme, LightTheme } from "@/config/defaults.config";
import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext(null);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ defaultTheme, children }) => {
  const [theme, setThemeOrigin] = useState(defaultTheme);
  const mode = theme === DarkTheme ? "dark" : "light";

  const setTheme = (theme) => {
    setThemeOrigin(theme);
    localStorage.setItem("theme", theme);
  };

  const toggleTheme = () => {
    setTheme(mode === "dark" ? LightTheme : DarkTheme);
    if (mode === "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
    localStorage.setItem("mode", mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
