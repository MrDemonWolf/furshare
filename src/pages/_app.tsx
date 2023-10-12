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
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={process.env.NEXT_PUBLIC_APP_NAME} />
        <meta
          property="og:description"
          content={process.env.NEXT_PUBLIC_APP_NAME}
        />
        <meta property="og:image" content="/og.png" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:site"
          content={`@${process.env.NEXT_PUBLIC_TWITTER_HANDLE}`}
        />
        <meta
          name="twitter:creator"
          content={`@${process.env.NEXT_PUBLIC_TWITTER_HANDLE}`}
        />
        <meta name="twitter:title" content={process.env.NEXT_PUBLIC_APP_NAME} />
        <meta
          name="twitter:description"
          content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        />
        <meta name="twitter:image" content="/og.png" />
        <meta name="twitter:url" content={process.env.NEXT_PUBLIC_APP_URL} />
        <meta name="twitter:domain" content={process.env.NEXT_PUBLIC_APP_URL} />
      </Head>
      <ClerkProvider
        appearance={{
          elements: {
            footer:
              process.env.NEXT_PUBLIC_SIGN_UP_ENABLED !== "true"
                ? "hidden"
                : "show",
          },
        }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Component {...pageProps} />
        </ThemeProvider>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
