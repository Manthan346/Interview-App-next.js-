"use client";

import company from "@/public/assets/images/company.jpeg";
import { motion } from "motion/react";
import Image from "next/image";
const Info = () => {
  return (
    <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: false, amount: 0.2 }}
  className="relative bg-primary text-primary-foreground flex items-center justify-center overflow-hidden py-20 px-6 sm:px-10 lg:px-20"
>
  <div className="mx-auto flex flex-col items-center justify-center text-center max-w-6xl h-60">
    {/* Centered Text Section */}
    <div className="text-4xl sm:text-5xl lg:text-5xl font-semibold leading-[1.05] tracking-tight h-70">
      We’re engineers on a mission to make hiring fair. At Mockbuddy, we bring
      real interview experiences minus the bias — helping you show what really
      matters: skill, not connections.
    </div>

  
  </div>
</motion.section>

  );
};

export default Info;
