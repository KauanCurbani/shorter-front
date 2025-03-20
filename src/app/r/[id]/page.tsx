import { api } from "@/lib/api";
import { redirect } from "next/navigation"

export default async function Page({params}: {params: {id: string}}) {
 const response = await api.get(`/api/short-url/${params.id}`);
 
 if (response.data.url){
  redirect(response.data.url);
 }
 
  return (
    <div>
      <h1>{params.id }</h1>
    </div>
  );
}