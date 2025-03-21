"use client";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";
import { useEffect } from "react";

type tParams = Promise<{ id: string }>;

export default function Page({ params }: { params: tParams }) {
  useEffect(() => {
    (async () => {
      const { id } = await params;
      Promise.all([
        api.get(`/api/short-url/${id}`),
        api.get(`/api/short-url/consume/${id}`),
      ]).then((res) => {
        const [response] = res;
        if (response.data.url) {
          redirect(response.data.url);
        }
      });
    })();
  }, []);

  return <div></div>;
}
