import DefaultLayout from "@/components/layouts/default";
import { useParams } from "next/navigation";

type Params = {
  token: string;
};

export default function AppPage() {
  const params = useParams<Params>();

  return (
    <DefaultLayout>
      <main>{JSON.stringify(params)}</main>
    </DefaultLayout>
  );
}
