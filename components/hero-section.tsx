"use client";

import { Button } from "@/components/ui/button";
import banner from "@/public/assets/images/banner.jpg";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative w-full h-[75vh] md:h-[80vh] overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src={banner}
        alt="Cleaning Service"
        className="absolute inset-0 w-full h-full object-cover object-[center_1%] "
      />

      {/* Overlay with light blue gradient */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#0b213f]/90 via-[#0b213f]/70 to-transparent" />

      {/* Text Content */}
      <div className="relative z-10 flex items-center h-full px-6 sm:px-10 md:px-20">
        <div className="max-w-2xl text-background space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            MockBuddyIO <br />
            Worried About Your Next Interview?
          </h1>
          <p className="text-lg text-foreground-200 max-w-md">
            Bridge the gap between learning and landing your dream job.Real interview simulations with
            industry experts — your success starts here.
          </p>
          <Button className="bg-primary text-background h-12 w-40  transition-all px-6 py-3 text-lg font-semibold rounded-">
            <Link href="/interview">Get Started</Link>
          </Button>
        </div>
      </div>

      {/* Decorative foreground bubbles at bottom */}
    </motion.section>
  );
}

export default HeroSection;
