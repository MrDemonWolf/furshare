import Head from "next/head";

import AuthLayout from "@/components/layouts/auth";
import SignUpDisabled from "~/components/sign-up/sign-up-disabled";
import SignUpEnabled from "~/components/sign-up/sign-up-enabled";
import { env } from "~/env.mjs";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign Up - Furshare</title>
      </Head>
      <AuthLayout>
        <div className="flex h-full w-full flex-col items-center justify-center">
          {env.NEXT_PUBLIC_APP_SIGNUPS_ENABLED === "true" && <SignUpEnabled />}
          {env.NEXT_PUBLIC_APP_SIGNUPS_ENABLED !== "true" && <SignUpDisabled />}
        </div>
      </AuthLayout>
    </>
  );
}
