import BookSession from "@/components/mock-interview";
import Navbar from "@/components/navbar";
import { auth } from "@/lib/auth/auth-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Interview() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <Navbar />
      <BookSession />
    </>
  );
}
