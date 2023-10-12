import { type AppType } from "next/app";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "~/components/theme-provider";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Furshare</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Save money on your health insurance today!"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Vincent" />
        <meta property="og:description" content="Vincent" />
        <meta property="og:image" content="/og.png" />
        <meta property="og:url" content="https://app.getcoveredandsave.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vincent" />
        <meta name="twitter:creator" content="@vincent" />
        <meta name="twitter:title" content="Vincent" />
        <meta
          name="twitter:description"
          content="Save money on your health insurance today!"
        />
        <meta name="twitter:image" content="/og.png" />
        <meta name="twitter:url" content="https://app.getcoveredandsave.com" />
        <meta name="twitter:domain" content="app.getcoveredandsave.com" />
      </Head>
      <ClerkProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Component {...pageProps} />
        </ThemeProvider>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
