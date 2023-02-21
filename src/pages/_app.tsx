import { ThemeProvider, useTheme } from "@/components/Theme/state";
import { BaseStyle, DarkTheme, LightTheme } from "@/config/defaults.config";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { getCookie } from "cookies-next";
import App, { AppContext, AppProps, AppInitialProps } from "next/app";

type AppOwnProps = { colorScheme: string };

export default function AppWrap({
  Component,
  pageProps,
  colorScheme,
}: AppProps & AppOwnProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const defaultTheme = colorScheme === "dark" ? DarkTheme : LightTheme;

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider defaultTheme={defaultTheme}>
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
            <Layout>
              <Component {...pageProps} />
            </Layout>
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

AppWrap.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  return {
    // get color scheme from cookie
    colorScheme:
      `${getCookie("mantine-color-scheme", {
        req: context.ctx.req,
        res: context.ctx.res,
      })}` || "light",
    ...ctx,
  };
};
