import Head from "next/head";

export default function Landing() {
  return (
    <>
      <Head>
        <title>Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <h1>Hello Awooo</h1>
    </>
  );
}
