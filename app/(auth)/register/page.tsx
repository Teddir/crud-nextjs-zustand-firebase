"use client";
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "../_components/navbar";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .default(""),
  email: z
    .string()
    .min(1, {
      message: "email must be at least 1 characters.",
    })
    .email("This is not a valid email.")
    .default(""),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .default(""),
});

export default function Register() {
  const { status } = useSession() || { status: "unauthenticated" };
  const router = useRouter();
  const navbar = useMemo(
    () => (
      <Navbar
        btnText='Log in'
        desc='Have an account?'
        pushTo='/login'
      />
    ),
    []
  );
  const body = useMemo(() => <Body />, []);

  if (status == "loading") return <p>loading</p>;
  if (status == "authenticated") return router.replace("/");

  return (
    <div className='flex flex-col gap-16 w-full h-full p-4 xl:p-8'>
      {navbar}
      {body}
    </div>
  );
}

const Body = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);

  async function onSubmit(data = {}) {
    setloading(true);
    try {
      ("user server");
      let response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await response.json();

      if (res?.error) throw new Error(res?.error);

      toast({
        description: "Register success.",
        duration: 1000,
      });

      return router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error?.message ?? error,
          duration: 1000,
        });
      }
    } finally {
      setloading(false);
    }
  }

  return (
    <div className='flex flex-wrap place-content-center h-full'>
      <div className='w-full sm:max-w-[60%] xl:max-w-[35%] flex flex-col gap-16'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-700 dark:text-white'>
            Register Form
          </h1>
          <p className='leading-7 [&:not(:first-child)]:mt-6 text-center'>
            Lakukan apa yang kamu mau di dalam website ini tanpa ada batasan
            lain.
          </p>
        </div>
        <div className='w-full'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='username'
                        {...field}
                        value={field?.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='email'
                        {...field}
                        value={field?.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex flex-row items-center gap-4'>
                        <Input
                          placeholder='password'
                          type={showPassword ? "text" : "password"}
                          {...field}
                          value={field?.value || ""}
                        />
                        <div onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <EyeOpenIcon
                              width={24}
                              height={24}
                            />
                          ) : (
                            <EyeClosedIcon
                              width={24}
                              height={24}
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                name='continue'
                disabled={loading}
                className='w-full'>
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
