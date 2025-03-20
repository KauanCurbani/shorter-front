"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  name: z.string().min(2),
});

type SignIn = z.infer<typeof schema>;
export default function Page() {
  const router = useRouter();
  const form = useForm<SignIn>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Sign-in</h1>
      <span className="text-muted-foreground text-xs uppercase">
        Sign-in in your to give access to more features
      </span>

      <Form {...form}>
        <form  className="space-y-2 mt-4">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full mt-4">Sign in</Button>
        </form>
      </Form>
      
      <div className="flex flex-col justify-center items-center mt-4">
      <span className="text-muted-foreground text-xs">
        No have an account yet?
      </span>
      
      <Button size={"sm"} variant={"link"} onClick={() => router.push("/auth/register")}>Register</Button>
      </div>
    </div>
  );
}
