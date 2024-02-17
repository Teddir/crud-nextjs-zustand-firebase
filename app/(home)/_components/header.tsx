"use client";

import { useAuthStore } from "@/store/authStore";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SiteIcon } from "@/public";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const setUser = useAuthStore((state) => state.setUser);

  const validasiAuth = useCallback(async () => {
    if (status == "unauthenticated") return router.replace("/login");

    try {
      let response = await fetch(`/api/profile?uid=${session?.user.id}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Error get profile");
      let res = await response.json();

      if (session?.user?.email) {
        // If there's a session, update the Zustand store
        setUser({
          username: res?.datas?.username ?? "",
          email: session.user?.email ?? "",
        });
      } else {
        // If there's no session, reset the user in the Zustand store
        setUser(null);
      }
    } catch (error) {
      // console.log(error);
    }
  }, [status, session]);

  useEffect(() => {
    validasiAuth();
  }, [status, session]);

  return (
    <div className='flex w-full p-4 border-b justify-between items-center'>
      <div className='w-8'>
        <Link
          href={"/"}
          shallow
          aria-label='home'>
          <Image
            alt='primary_icon'
            src={SiteIcon}
            blurDataURL={SiteIcon.blurDataURL}
            width={24}
            height={24}
            className='w-auto h-auto'
            priority
          />
        </Link>
      </div>
      <Button
        variant={"outline"}
        onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
}
