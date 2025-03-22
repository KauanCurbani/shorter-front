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
  passwordConfirmation: z.string().min(6),
  fullName: z.string().min(2),
});

type Register = z.infer<typeof schema>;
export default function Page() {
  const router = useRouter();

  const form = useForm<Register>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      fullName: "",
    },
  });

  const onSubmit = async (value: Register) => {
    try {
      await api.post("/api/auth/register", value);
      toast.success("Account created successfully");
      router.push("/auth/login");
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
      else toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Register</h1>
      <span className="text-muted-foreground text-xs uppercase">
        Create an account to give access to more features
      </span>

      <Form {...form}>
        <form className="space-y-2 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full mt-4"
          >
           {form.formState.isSubmitting ? "Loading..." : "Register"}
          </Button>
        </form>
      </Form>

      <div className="flex flex-col justify-center items-center mt-4">
        <span className="text-muted-foreground text-xs">
          Already have an account?
        </span>

        <Button
          size={"sm"}
          variant={"link"}
          onClick={() => router.push("/auth/login")}
        >
          Sign-in
        </Button>
      </div>
    </div>
  );
}
