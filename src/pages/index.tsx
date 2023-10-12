import SignUpEnabled from "~/components/landing/sign-up-enabled";
import SignUpDisabled from "~/components/landing/sign-up-disabled";

export default function Landing() {
  return (
    <>
      {process.env.NEXT_PUBLIC_SIGN_UP_ENABLED === "true" && <SignUpEnabled />}
      {process.env.NEXT_PUBLIC_SIGN_UP_ENABLED !== "true" && <SignUpDisabled />}
    </>
  );
}
