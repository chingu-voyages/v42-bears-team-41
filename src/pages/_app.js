import { ThemeProvider, useTheme } from "@/components/Theme/state";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";
import { BaseStyle, DarkTheme, LightTheme } from "@/config/defaults.config";
import "@/styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  let dark = false;
  if (typeof window !== "undefined") {
    // Client-side-only code
    dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider defaultTheme={dark ? DarkTheme : LightTheme}>
        <DaisyThemeSetter>
          <ThemeToggle className="absolute top-0 right-0 mt-4 mr-4" />
          <Component {...pageProps} />
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
