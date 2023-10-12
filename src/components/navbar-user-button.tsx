import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { useTheme } from "next-themes";

export default function NavbarUserButton() {
  const { theme } = useTheme();
  return (
    <>
      {theme === "dark" && (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <UserButton
          appearance={{
            baseTheme: dark,
            userProfile: {
              baseTheme: dark,
            },
          }}
        />
      )}
      {theme !== "dark" && <UserButton />}
    </>
  );
}
