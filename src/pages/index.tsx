import Head from "next/head";

import SignUpEnabled from "~/components/landing/sign-up-enabled";
// import SignUpDisabled from "~/components/landing/sign-up-disabled";

export default function Landing() {
  return (
    <>
      <SignUpEnabled />
    </>
  );
}
