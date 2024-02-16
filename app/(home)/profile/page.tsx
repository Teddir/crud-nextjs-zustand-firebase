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
import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const { user } = useAuthStore();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [forms, setForms] = useState({
    username: user?.username,
    password: "",
  });
  const setUser = useAuthStore((state) => state.setUser);

  async function updateAccount() {
    try {
      let response = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({
          username: forms?.username,
          uid: session?.user?.id,
        }),
      });
      let res = await response.json();

      if (res?.error) throw new Error(res?.error);

      toast({
        description: "User updated.",
        duration: 3000,
      });
      setUser({
        username: forms?.username,
        email: user?.email,
      });
      document.getElementById("closeDialog")?.click();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error?.message ?? error,
          duration: 3000,
        });
      }
    }
  }

  async function deleteAccount() {
    try {
      let response = await fetch("/api/profile", {
        method: "DELETE",
        body: JSON.stringify({
          email: user?.email,
          password: forms?.password,
        }),
      });
      let res = await response.json();

      if (res?.error) throw new Error(res?.error);

      toast({
        description: "User deleted.",
        duration: 3000,
      });
      setUser({
        username: forms?.username,
        email: user?.email,
      });
      document.getElementById("closeDialog")?.click();
      signOut();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error?.message ?? error,
          duration: 3000,
        });
      }
    }
  }

  return (
    <div className='flex w-screen h-screen max-h-screen justify-center place-content-center'>
      <div className='md:max-w-[60vw]  w-full'>
        <Header />
        <div className='xl:p-24 md:p-16 p-12 flex flex-col gap-4'>
          <>
            <div className='flex sm:flex-row flex-col sm:items-center items-start gap-4'>
              <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl capitalize'>
                Your Profile {user?.username}{" "}
              </h1>

              <CustomDialog
                title='Edit profile'
                desc="Make changes to your profile here. Click save when you're done."
                handleSubmit={{
                  onClick: () => updateAccount(),
                  text: "Save Changes",
                  disabled: false,
                }}
                renderContent={
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label
                        htmlFor='username'
                        className='text-right'>
                        username
                      </Label>
                      <Input
                        id='username'
                        value={forms?.username}
                        className='col-span-3'
                        onChange={(val) =>
                          setForms((old) => ({
                            ...old,
                            username: val?.target?.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                }>
                <Button
                  variant={"ghost"}
                  className='p-4 rounded-full h-full'>
                  <Pencil1Icon
                    width={42}
                    height={42}
                    className='text-primary'
                  />
                </Button>
              </CustomDialog>
            </div>

            <div className='flex flex-row items-center gap-4'>
              <p className='leading-7 [&:not(:first-child)]:mt-6'>
                {user?.email}
              </p>
            </div>
          </>
          <CustomDialog
            title='Edit profile'
            desc="Make changes to your profile here. Click save when you're done."
            handleSubmit={{
              onClick: () => deleteAccount(),
              text: "Delete Account",
              disabled: false,
            }}
            renderContent={
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='password'
                    className='text-right'>
                    password
                  </Label>
                  <Input
                    id='password'
                    value={forms?.password}
                    className='col-span-3'
                    onChange={(val) =>
                      setForms((old) => ({
                        ...old,
                        password: val?.target?.value,
                      }))
                    }
                  />
                </div>
              </div>
            }>
            <Button
              className='flex items-start w-fit p-0 text-destructive'
              variant={"link"}>
              Delete Account
            </Button>
          </CustomDialog>
        </div>
      </div>
    </div>
  );
}
