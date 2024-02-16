"use client";
import { SiteIcon } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "../_components/navbar";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const navbar = useMemo(
    () => (
      <Navbar
        btnText='Sign up'
        desc="Don't have an account?"
        pushTo='/register'
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
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.error == "CredentialsSignin") {
        throw new Error(
          "Invalid credentials. Please check your email and password."
        );
      }
      toast({
        description: "Login berhasil.",
        duration: 1000,
      });
      if (res?.url) router.push(res.url);
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
            Welcome Back
          </h1>
          <p className='leading-7 [&:not(:first-child)]:mt-6 text-center'>
            Website yang memudahkan Anda untuk mengelola bisnis Anda dengan
            lebih efisien dan mudah.
          </p>
        </div>
        <div className='w-full'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='email'
                        {...field}
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
