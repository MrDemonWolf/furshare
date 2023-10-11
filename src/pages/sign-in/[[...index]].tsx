import Head from "next/head";
import { SignIn } from "@clerk/nextjs";

import AuthLayout from "~/components/layouts/auth";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign In - Furshare</title>
      </Head>
      <AuthLayout>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <SignIn />
        </div>
      </AuthLayout>
    </>
  );
}
