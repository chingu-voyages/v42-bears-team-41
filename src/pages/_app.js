import { ThemeProvider, useTheme } from "@/components/Theme/state";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";
import { BaseStyle, DarkTheme, LightTheme } from "@/config/defaults.config";
import "@/styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  let dark = false;
  if (typeof window !== "undefined") {
    // Client-side-only code
    dark =
      localStorage.getItem("mode") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [localStorageTheme, setLocalStorageTheme] = useState();

  useEffect(() => {
    if (!dark) {
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
    setLocalStorageTheme(localStorage.getItem("theme"));
  }, [dark]);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider
        defaultTheme={localStorageTheme || (dark ? DarkTheme : LightTheme)}
      >
        <DaisyThemeSetter>
          <div
            style={{
              position: "fixed",
              padding: 0,
              margin: 0,

              top: 0,
              left: 0,
              bottom: 0,
              right: 0,

              width: "100%",
              height: "100%",
              background: "hsl(var(--b1))",

              overflow: "auto",
            }}
          >
            <ThemeToggle className="absolute top-0 right-0 mt-4 mr-4" />
            <Component {...pageProps} />
          </div>
        </DaisyThemeSetter>
      </ThemeProvider>
    </SessionContextProvider>
  );
}

function DaisyThemeSetter({ children }) {
  const { theme } = useTheme();
  return (
    <div data-theme={theme}>
      <div className={BaseStyle}>{children}</div>
    </div>
  );
}
