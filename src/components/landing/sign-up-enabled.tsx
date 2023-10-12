import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@clerk/nextjs";

import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavbarUserButton from "~/components/navbar-user-button";
import { ThemeToggle } from "../theme-toggle";

export default function Landing() {
  const { isLoaded, isSignedIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-oabsolute sm:top-[calc(100%-30rem)]nly inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl">
                  Furshare
                </span>
                <Image
                  className="h-8 w-auto"
                  src="/img/logo.png"
                  alt="Furshare Logo"
                  width={32}
                  height={32}
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden items-center lg:flex lg:flex-1 lg:justify-end">
              <ThemeToggle />
              {!isLoaded ||
                (!isSignedIn && (
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-white"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </a>
                ))}
              {isSignedIn && <NavbarUserButton />}
            </div>
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Furshare</span>
                  <Image
                    className="h-8 w-auto"
                    src="/img/logo.png"
                    alt="Furshare Logo"
                    width={32}
                    height={32}
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/25">
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
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
                  {process.env.NEXT_PUBLIC_APP_DESCRIPTION}
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  {!isLoaded ||
                    (!isSignedIn && (
                      <Link
                        href="/sign-up"
                        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                      >
                        Get started
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

                  <Link
                    href="https://www.github.com/mrdemonwolf/furshare"
                    target="_blank"
                    className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <Image
                src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
