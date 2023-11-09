import SignUpEnabled from "@/components/landing/sign-up-enabled";
import SignUpDisabled from "~/components/landing/sign-up-disabled";
import { env } from "~/env.mjs";

export default function Landing() {
  return (
    <>
      {env.NEXT_PUBLIC_APP_SIGNUPS_ENABLED === "true" && <SignUpEnabled />}
      {env.NEXT_PUBLIC_APP_SIGNUPS_ENABLED !== "true" && <SignUpDisabled />}
    </>
  );
}
