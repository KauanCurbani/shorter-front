"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { useLanguage } from "@/internalization/context";
import { LanguageSelector } from "@/internalization/language-selector";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { texts } = useLanguage();
  const router = useRouter();
  const schema = z.object({
    link: z.string().url({ message: texts.invalidUrl }),
  });
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      link: "",
    },
  });

  const onSubmit = form.handleSubmit(async () => {
    try {
      
      setLoading(true);
      const response = await api.post("/api/short-url", {
        url: form.getValues().link,
      });
      const { id } = response.data;
      await navigator.clipboard.writeText(`https://short.curbanii.net/r/${id}`);
      toast.success(texts.copiedToClipboard);
      setLoading(false);
    } catch (e) { 
      setLoading(false);
      if(e instanceof AxiosError) toast.error(e.response?.data.message);
      else toast.error(`${e}`)
    }
  });

  return (
    <>
      <div className="flex border-b bg-background p-4 w-full justify-between items-center fixed top-0 left-0 right-0">
        <span>logo</span>
        <LanguageSelector />
      </div>
      <div className="min-h-dvh flex flex-col justify-center items-center">
        <Toaster position="top-center" />
        <div className="flex flex-col items-center max-w-lg p-4">
          <h1 className="font-bold uppercase text-2xl mb-2 text-center">
            {texts.freeAndSimpleUrlShortener}
          </h1>
          <span className="text-muted-foreground text-center">
            {texts.description}
          </span>
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="w-full flex flex-col items-center"
            >
              <FormField
                name="link"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full my-6">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://...."
                        className=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="uppercase" disabled={loading}>
                {loading ? texts.baseLoading : texts.shortNow}
              </Button>
            </form>
          </Form>

          <small className="mt-2 text-muted-foreground">
            {texts.tryProVersionToCustomize}
          </small>

          <Separator className="my-6" />

          <small className="mt-2 text-muted-foreground text-center">
            {texts.promoteAccount}
          </small>

          <div className="flex items-center mt-2">
            <Button
              variant={"link"}
              size={"sm"}
              onClick={() => router.push("/auth/login")}
            >
              {texts.signIn}
            </Button>
            <span className="text-muted-foreground">{texts.or}</span>
            <Button
              variant={"link"}
              size={"sm"}
              onClick={() => router.push("/auth/register")}
            >
              {texts.register}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
