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
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
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

  const onSubmit = async (value: SignIn) => {
    console.log(value);
    try {
      await api.post("/api/auth/sign-in", value);
      toast.success("Sign-in successfully");
      router.push("/dash");
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
      else toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Sign-in</h1>
      <span className="text-muted-foreground text-xs uppercase">
        Sign-in in your to give access to more features
      </span>

      <Form {...form}>
        <form
          className="space-y-2 mt-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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

          <Button className="w-full mt-4">
            {form.formState.isSubmitting ? "Loading..." : "Sign-in"}
          </Button>
        </form>
      </Form>

      <div className="flex flex-col justify-center items-center mt-4">
        <span className="text-muted-foreground text-xs">
          No have an account yet?
        </span>

        <Button
          size={"sm"}
          variant={"link"}
          onClick={() => router.push("/auth/register")}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
