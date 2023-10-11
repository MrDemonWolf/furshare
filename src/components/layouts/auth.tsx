import type { PropsWithChildren } from "react";

export default function AuthLayout(props: PropsWithChildren) {
  return <main className="flex h-screen justify-center">{props.children}</main>;
}
