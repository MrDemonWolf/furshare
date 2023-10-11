import Head from "next/head";
import { SignUp } from "@clerk/nextjs";

import AuthLayout from "~/components/layouts/auth";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign Up - Furshare</title>
      </Head>
      <AuthLayout>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <SignUp />
        </div>
      </AuthLayout>
    </>
  );
}
