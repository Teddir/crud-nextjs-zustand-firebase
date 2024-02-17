"use client";

import { useAuthStore } from "@/store/authStore";
import Header from "../_components/header";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
import CustomDialog from "../_components/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const { user } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();
  const [forms, setForms] = useState({
    username: "",
    password: "",
  });
  const setUser = useAuthStore((state) => state.setUser);

  async function updateAccount() {
    try {
      if (forms?.username?.length <= 2)
        throw new Error("username must be at least 2 characters");

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
      <div className='md:max-w-[60vw] w-full'>
        <Header />
        <div className='xl:p-24 md:p-16 p-12 flex flex-col gap-4'>
          <>
            <div className='flex sm:flex-row flex-col sm:items-center items-start gap-4'>
              <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl capitalize'>
                Your Profile {user?.username}{" "}
              </h1>

              <CustomDialog
                title='Edit profile'
                id='edit'
                desc="Make changes to your profile here. Click save when you're done."
                handleSubmit={{
                  onClick: () => updateAccount(),
                  text: "Save Changes",
                  disabled: !forms?.username,
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
                        value={forms?.username || ""}
                        placeholder='username'
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
                  name='submit'
                  data-testid='edit-profile-button'
                  className='p-4 rounded-full h-full sm:w-fit w-full sm:bg-transparent bg-primary sm:text-primary text-primary-foreground'>
                  <span className='sm:hidden flex mr-2'>Update Profile </span>
                  <Pencil1Icon className='sm:w-8 sm:h-8 w-6 h-6 ' />
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
            id='delete'
            title='Delete profile'
            desc="Delete your profile. Click delete when you're done."
            handleSubmit={{
              onClick: () => deleteAccount(),
              text: "Delete My Account",
              disabled: !forms?.password,
            }}
            renderContent={
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label
                    htmlFor='password'
                    className='text-right'>
                    password
                  </Label>
                  <div className='flex flex-row items-center w-full gap-4 col-span-3'>
                    <Input
                      id='password'
                      type={showPassword ? "text" : "password"}
                      value={forms?.password || ""}
                      onChange={(val) =>
                        setForms((old) => ({
                          ...old,
                          password: val?.target?.value,
                        }))
                      }
                    />
                    <div
                      id='toggle-password'
                      onClick={() => setShowPassword(!showPassword)}>
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
              </div>
            }>
            <Button
              className='flex items-start w-fit p-0 text-destructive'
              data-testid='delete-profile-button'
              variant={"link"}>
              Delete Account
            </Button>
          </CustomDialog>
        </div>
      </div>
    </div>
  );
}
