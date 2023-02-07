import { DefaultTheme } from "@/config/defaults.config";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  let theme = DefaultTheme;
  if (typeof window !== "undefined") {
    theme =
      localStorage.getItem("mode") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  return (
    <Html lang="en" data-theme={theme}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
