import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

function Contact() {
  return (
    <div>
      <Navbar />
      <section className="bg-background text-foreground py-32 px-6 sm:px-10 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          {/* Left: Contact Form */}
          <div className="bg-card border rounded-2xl shadow-md p-8  sm:p-10">
            <h2 className="text-3xl font-semibold font-blender mb-2">
              How do we get in touch?
            </h2>
            <p className="text-muted-foreground mb-8">
              Leave us your details and we'll reach out within 24 hours!
            </p>

            <form className="space-y-9">
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@company.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Leave us a message..."
                  rows={4}
                />
              </div>

              <div className="flex justify-between items-center pt-4">
                <Link href="/">
                  <Button variant="outline">Go back</Button>
                </Link>
                <Button className="bg-primary text-primary-foreground hover:opacity-90">
                  Continue
                </Button>
              </div>
            </form>
          </div>

          {/* Right: Image (hidden on mobile) */}
          <div className="hidden  md:hidden xl:flex h-181 justify-center items-center">
            <Image
              src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?semt=ais_hybrid"
              alt="Dashboard Preview"
              className="rounded-2xl shadow-xl border w-full h-full"
              width={400}
              height={400}
            />
          </div>
        </div>

        {/* Logos or Trusted Companies */}
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
