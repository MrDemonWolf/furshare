import type { PropsWithChildren } from "react";

export default function PageLayout(props: PropsWithChildren) {
  return <div className=" h-screen">{props.children}</div>;
}
