import { DarkTheme, LightTheme } from "@/config/defaults.config";
import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext(null);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ defaultTheme, children }) => {
  const [theme, setTheme] = useState(defaultTheme);
  const mode = theme === DarkTheme ? "dark" : "light";

  const toggleTheme = () => {
    setTheme(mode === "dark" ? LightTheme : DarkTheme);
    localStorage.setItem("mode", mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
