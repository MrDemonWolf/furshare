import type { PropsWithChildren } from "react";

export default function DefaultLayout(props: PropsWithChildren) {
  return <div className=" h-screen">{props.children}</div>;
}
