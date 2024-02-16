"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  if (status == "loading") return <p>loading</p>;
  if (status == "unauthenticated") return router.replace("/login");
  if (status == "authenticated") return router.replace("/profile");
  return router.replace("/profile");
}
