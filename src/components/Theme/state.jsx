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
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
