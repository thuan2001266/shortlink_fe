import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="lightmodebasic dark:darkmodebasic text-sm md:text-base">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
