import { api } from "@/lib/api";
import { redirect } from "next/navigation";

type tParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: tParams }) {
  const { id } = await params;
  const response = await api.get(`/api/short-url/${id}`);

  if (response.data.url) {
    redirect(response.data.url);
  }

  return <div></div>;
}
