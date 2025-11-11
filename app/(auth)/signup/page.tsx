import practice2 from "@/public/assets/images/practice2.jpg";
import { SignupForm } from "@/components/signup-form";
import Image from "next/image";
import { auth } from "@/lib/auth/auth-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/interview");
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start"></div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={practice2}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover  dark:grayscale"
        />
      </div>
    </div>
  );
}
