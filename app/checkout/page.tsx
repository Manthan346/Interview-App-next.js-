import Checkout from "@/components/checkout";
import Navbar from "@/components/navbar";
import { auth } from "@/lib/auth/auth-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <Navbar />
      <Checkout />
    </>
  );
}
