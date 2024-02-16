"use client";

import { useAuthStore } from "@/store/authStore";
import Header from "../_components/header";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import CustomDialog from "../_components/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

export default function Profile() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [forms, setForms] = useState({ new_email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  async function updateAccount() {
    try {
      let response = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({
          new_email: forms?.new_email,
          password: forms?.password,
          email: user?.email,
        }),
      });
      let res = await response.json();

      if (res?.error) throw new Error(res?.error);

      toast({
        description: "Email updated.",
        duration: 1000,
      });
      document.getElementById("closeDialog")?.click();
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
    }
  }

  async function deleteAccount() {
    try {
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex w-screen h-screen max-h-screen justify-center place-content-center'>
      <div className='max-w-[50vw] w-full'>
        <Header />
        <div className='p-24 flex flex-col gap-4'>
          <>
            <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl capitalize'>
              Your Profile {user?.email?.split("@")?.[0]}{" "}
            </h1>
            <div className='flex flex-row items-center gap-4'>
              <p className='leading-7 [&:not(:first-child)]:mt-6'>
                email : {user?.email}
              </p>
              <CustomDialog
                title='Edit profile'
                desc="Make changes to your profile here. Click save when you're done."
                handleSubmit={{
                  onClick: () => updateAccount(),
                  text: "Save Changes",
                  disabled: !forms?.password,
                }}
                renderContent={
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label
                        htmlFor='email'
                        className='text-right'>
                        email
                      </Label>
                      <Input
                        id='email'
                        value={forms?.new_email}
                        className='col-span-3'
                        onChange={(val) =>
                          setForms((old) => ({
                            ...old,
                            new_email: val?.target?.value,
                          }))
                        }
                      />
                    </div>
                    {forms?.new_email?.length > 0 && (
                      <>
                        <p className='leading-7 [&:not(:first-child)]:mt-6'>
                          Masukkan password anda untuk melanjutkan proses update
                          email
                        </p>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <Label
                            htmlFor='password'
                            className='text-right'>
                            Password
                          </Label>
                          <div className='flex col-span-3 flex-row items-center gap-6'>
                            <div>
                              <Input
                                id='password'
                                type={showPassword ? "text" : "password"}
                                value={forms?.password}
                                onChange={(val) =>
                                  setForms((old) => ({
                                    ...old,
                                    password: val?.target?.value,
                                  }))
                                }
                              />
                            </div>
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
                        </div>
                      </>
                    )}
                  </div>
                }>
                <Button variant={"ghost"}>
                  <Pencil1Icon
                    width={24}
                    height={24}
                    className='text-primary'
                  />
                </Button>
              </CustomDialog>
            </div>
            <p className='leading-7 [&:not(:first-child)]:mt-6'>
              Once upon a time, in a far-off land, there was a very lazy king
              who spent all day lounging on his throne. One day, his advisors
              came to him with a problem: the kingdom was running out of money.
            </p>
          </>
          <Button
            className='flex items-start w-fit p-0 text-destructive'
            variant={"link"}
            onClick={() => deleteAccount()}>
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
