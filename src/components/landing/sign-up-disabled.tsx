import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@clerk/nextjs";

import NavbarUserButton from "~/components/navbar-user-button";
import { ThemeToggle } from "../theme-toggle";

export default function Landing() {
  const { isLoaded, isSignedIn } = useAuth();
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="items-cet flex flex-1 items-center">
              {/* @DevBowser was here */}
              <a href="#" className="-m-1.5 p-1.5">
                <Image
                  className="h-8 w-auto"
                  src="/img/logo.png"
                  alt="Furshare Logo"
                  width={32}
                  height={32}
                />
              </a>
            </div>

            <div className=" flex flex-1 items-center justify-end">
              <ThemeToggle />
              {!isLoaded ||
                (!isSignedIn && (
                  <Link
                    href="/sign-in"
                    className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                ))}
              {isSignedIn && <NavbarUserButton />}
            </div>
          </nav>
        </header>

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
                  Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
                </h1>
                <p className="mt-6 text-lg leading-8  text-gray-600 dark:text-gray-300">
                  We appologize for the inconvenience, but the owner of {""}
                  {process.env.NEXT_PUBLIC_APP_NAME} has decided disable new
                  sign ups site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
