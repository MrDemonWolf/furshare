import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignUpEnabled() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      {resolvedTheme === "dark" && (
        <SignUp
          appearance={{
            baseTheme: dark,
          }}
        />
      )}
      {resolvedTheme !== "dark" && <SignUp />}
    </>
  );
}
