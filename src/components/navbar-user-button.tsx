import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { useTheme } from "next-themes";

export default function NavbarUserButton() {
  const { resolvedTheme } = useTheme();
  return (
    <>
      {resolvedTheme === "dark" && (
        <UserButton
          appearance={{
            baseTheme: dark,
            userProfile: {
              baseTheme: dark,
            },
          }}
        />
      )}
      {resolvedTheme !== "dark" && <UserButton />}
    </>
  );
}
