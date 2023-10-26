import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@clerk/nextjs";

import NavbarUserButton from "@/components/navbar-user-button";
import ThemeToggle from "@/components/theme-toggle";

export default function Landing() {
  const { isLoaded, isSignedIn } = useAuth();
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="items-cet flex flex-1 items-center">
            {/* @DevBowser was here */}
            <a href="#" className="-m-1.5 p-1.5">
              <Image
                className="inline-block h-8 w-auto"
                src="/img/logo.png"
                alt="Furshare Logo"
                width={32}
                height={32}
              />
              <span className="ml-3 text-xl font-bold">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </a>
          </div>

          <div className=" flex flex-1 items-center justify-end gap-1">
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
    </>
  );
}
