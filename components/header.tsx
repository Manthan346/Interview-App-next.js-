"use client";

import { Button } from "./ui/button";
import google from "@/public/assets/images/google.png";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

function Heading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} // start hidden and lower
      whileInView={{ opacity: 1, y: 0 }} // fade in and move up
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
      className="mx-auto w-full mt-40 max-w-7xl px-4 sm:px-6 lg:px-8 text-center"
    >
      <div className="text-2xl sm:text-2xl md:text-4xl lg:text-5xl tracking-tighter leading-[1.1] text-foreground/90 font-semibold">
       Anonymous mock interviews with experts from top product and service companies.
Masteryour technical, managerial, and HR rounds with feedback that pinpoints exactly what to improve.
      </div>

      {/* Subtitle */}
      <p className="mt-7 text-base sm:text-lg md:text-xl text-foreground ">
       Get better at any interview with our detailed feedback on exactly what you need to work on
      </p>

      {/* Google Button */}
      <div className="flex justify-center">
        <Button
          variant="default"
          className="flex items-center gap-3 bg-primary mt-10 sm:mt-14 mb-6 sm:mb-8 text-lg sm:text-xl md:text-2xl cursor-pointer text-primary-foreground h-14 sm:h-16 md:h-20 px-6 sm:px-10  hover:opacity-90"
        >
          <Image
            src={google}
            alt="Google"
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded"
          />
          <Link href="/login">Continue with Google</Link>
        </Button>
      </div>

      {/* Sign up link */}
      <div className="flex flex-col items-center space-y-2">
        <Link
          href="/login"
          className="cursor-pointer  text-base sm:text-lg md:text-xl"
        >
          or sign up with email
        </Link>
        <div className="w-24 sm:w-32 md:w-40 h-1 bg-primary hover:h-1.5 transition-all"></div>
      </div>
    </motion.div>
  );
}

export default Heading;
