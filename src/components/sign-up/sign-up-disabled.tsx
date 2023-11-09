import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { env } from "~/env.mjs";

export default function SignUpDisabled() {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Welcome to {env.NEXT_PUBLIC_APP_NAME}
          </h1>
          <p className="mt-6 text-lg leading-8  text-gray-600 dark:text-gray-300">
            We appologize for the inconvenience, but the owner of {""}
            {env.NEXT_PUBLIC_APP_NAME} has decided disable new sign ups site.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {!isLoaded ||
              (!isSignedIn && (
                <Link
                  href="/sign-in"
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  Login
                </Link>
              ))}
            {isLoaded && isSignedIn && (
              <Link
                href="/app"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Go to App
              </Link>
            )}

            {env.NEXT_PUBLIC_APP_SHOW_GITUHB_LINK === "true" && (
              <Link
                href="https://www.github.com/mrdemonwolf/furshare"
                target="_blank"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Check Github Repo <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
