import Link from "next/link";

import { useAuth } from "@clerk/nextjs";

import { env } from "~/env.mjs";

/**
 * Components
 */
import Header from "@/components/landing/header";

export default function Disabled() {
  const { isLoaded, isSignedIn } = useAuth();
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <Header />

        <div className="relative isolate pt-14">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                  Welcome to {env.NEXT_PUBLIC_APP_NAME}
                </h1>
                <p className="mt-6 text-lg leading-8  text-gray-600 dark:text-gray-300">
                  We appologize for the inconvenience, but the owner of {""}
                  {env.NEXT_PUBLIC_APP_NAME} has decided disable new sign ups
                  site.
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
                  {isSignedIn && (
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
          </div>
        </div>
      </main>
    </>
  );
}
