import SignUpEnabled from "@/components/landing/sign-up-enabled";
import SignUpDisabled from "~/components/landing/sign-up-disabled";

export default function Landing() {
  return (
    <>
      {process.env.NEXT_PUBLIC_APP_SIGNUPS_ENABLED === "true" && (
        <SignUpEnabled />
      )}
      {process.env.NEXT_PUBLIC_APP_SIGNUPS_ENABLED !== "true" && (
        <SignUpDisabled />
      )}
    </>
  );
}
