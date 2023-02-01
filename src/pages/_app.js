import { ThemeProvider, useTheme } from "@/components/Theme/state";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";
import { DarkTheme, LightTheme } from "@/config/defaults.config";
import Layout from "@/components/Layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  let dark = false;
  if (typeof window !== "undefined") {
    // Client-side-only code
    dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  return (
    <ThemeProvider defaultTheme={dark ? DarkTheme : LightTheme}>
      <DaisyThemeSetter>
        <div style={{ visibility: "hidden" }}></div>
        <ThemeToggle className="absolute top-0 right-0 mt-4 mr-4" />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DaisyThemeSetter>
    </ThemeProvider>
  );
}

function DaisyThemeSetter({ children }) {
  const { theme } = useTheme();
  return <div data-theme={theme}>{children}</div>;
}
