"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { LogOut, Menu } from "lucide-react";
import logo from "@/public/assets/images/mockbuddy_logo.jpg";
import Image from "next/image";
import { Profile } from "./profile";
import { authClient } from "@/lib/auth/auth-client";
import toast from "react-hot-toast";

function Navbar() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleFAQClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (pathname !== "/") {
      // Navigate to home with hash
      window.location.href = "/#faq";
    } else {
      // Already on home page, just scroll
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle hash scrolling on mount and pathname changes
  useEffect(() => {
    if (window.location.hash === "#faq") {
      const el = document.getElementById("faq");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full border-b bg-background z-50 py-1">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-foreground font-bold font-sans text-xl hover:opacity-90"
        >
          {/* mockbuddy.io */}
          <Image src={logo} width={200} height={200} alt="logo-img" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`font-sans transition-colors ${
              isActive("/")
                ? "text-primary font-semibold"
                : "text-foreground hover:text-primary"
            }`}
          >
            Home
          </Link>
          <a
            href="#faq"
            onClick={handleFAQClick}
            className="text-foreground/80 font-sans hover:text-foreground transition-colors"
          >
            FAQ
          </a>
          {/* {!session && (
            <Link
              href="/login"
              className={`font-sans transition-colors ${
                isActive("/login")
                  ? "text-primary font-semibold"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Login
            </Link>
          )} */}

          <Link
            href="/contact"
            className={`font-sans transition-colors ${
              isActive("/contact")
                ? "text-primary font-semibold"
                : "text-foreground hover:text-primary"
            }`}
          >
            Contact Us
          </Link>
          {pathname !== "/interview" && pathname !== "/checkout" && (
            <Button
              asChild
              variant="default"
              className={`bg-primary text-primary-foreground font-sans hover:opacity-90 ${
                isActive("/signup") ? "ring-2 ring-primary/50" : ""
              }`}
            >
              <Link href="/interview">Give it a try</Link>
            </Button>
          )}

          {session ? (
            <Profile
              user={{
                name: session?.user.name ?? "",
                email: session?.user.email ?? "",
                avatar: session?.user.image ?? "",
              }}
            />
          ) : (
            <Button>
              <Link
                href="/login"
                className={`font-sans transition-colors text-neutral-100 hover:text-primary-foreground ${
                  isActive("/login")
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                Sign in
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-4 p-6">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={
                  isActive("/")
                    ? "text-primary font-semibold"
                    : "text-foreground/80 font-sans hover:text-foreground transition-colors"
                }
              >
                Home
              </Link>
              <a
                href="#faq"
                onClick={(e) => {
                  handleFAQClick(e);
                  setIsOpen(false);
                }}
                className="text-foreground/80 font-sans hover:text-foreground transition-colors"
              >
                FAQ
              </a>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={
                  isActive("/contact")
                    ? "text-primary font-semibold"
                    : "text-foreground/80 font-sans hover:text-foreground transition-colors"
                }
              >
                Contact Us
              </Link>

              {session ? (
                // <Profile
                //   user={{
                //     name: session?.user.name ?? "",
                //     email: session?.user.email ?? "",
                //     avatar: session?.user.image ?? "",
                //   }}
                // />
                <div
                  className="flex items-center gap-x-2"
                  onClick={async () => {
                    await authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          toast.success(
                            "You have been logged out successfully!"
                          );
                          router.push("/login"); // redirect to login page
                        },
                      },
                    });
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  Log out
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`font-sans transition-colors ${
                    isActive("/login")
                      ? "text-primary font-semibold"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  Login
                </Link>
              )}
              {pathname !== "/interview" && pathname !== "/checkout" && (
                <Button
                  asChild
                  variant="default"
                  className={`bg-primary text-primary-foreground font-sans hover:opacity-90 ${
                    isActive("/signup") ? "ring-2 ring-primary/50" : ""
                  }`}
                >
                  <Link href="/interview">Give it a try</Link>
                </Button>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
