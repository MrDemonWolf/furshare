import Head from "next/head";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

import AuthLayout from "~/components/layouts/auth";

export default function SignInPage() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Head>
        <title>Sign Up - Furshare</title>
      </Head>
      <AuthLayout>
        <div className="flex h-full w-full flex-col items-center justify-center">
          {resolvedTheme === "dark" && (
            <SignUp
              appearance={{
                baseTheme: dark,
              }}
            />
          )}
          {resolvedTheme !== "dark" && <SignUp />}
        </div>
      </AuthLayout>
    </>
  );
}
