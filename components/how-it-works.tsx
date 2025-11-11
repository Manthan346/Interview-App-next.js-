"use client";

import booking from "@/public/assets/images/booking.jpg";
import feedback from "@/public/assets/images/feedback.jpg";
import { motion } from "motion/react";
import Image from "next/image";

function HowItWorks() {
  return (
    <section className="bg-background text-foreground w-full">
      {/* Section 1 — Book Mock Interviews */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} // start hidden and lower
        whileInView={{ opacity: 1, y: 0 }} // fade in and move up
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
        className="my-16 flex w-full border-b-2 border-foreground-200 text-foreground"
      >
        <div className="flex-1 my-auto pb-8">
          <div className="flex max-w-3xl flex-col px-6 lg:ml-auto lg:px-20">
            <div className="font-semibold tracking-tighter text-3xl leading-tight lg:text-6xl">
              You are Just 3 Clicks away!
            </div>

            {/* Mobile Image */}
            <div className="relative block aspect-auto min-h-64 py-8 lg:hidden">
              <Image
                src={booking}
                alt="Book mock interviews"
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>

            <p className="text-base font-light text-foreground/90 lg:pt-6 lg:text-2xl">
             Once booked, let us know and we will schedule as per your and interviewers availability.
            </p>
          </div>
        </div>

        {/* Right Image (Desktop only) */}
        <div className="relative hidden aspect-auto min-h-[720px] flex-1 py-4 lg:block lg:py-0">
          <Image
            src={booking}
            alt="Book mock interviews"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      </motion.div>

      {/* Section 2 — Meet with Interviewer */}
      <motion.div
        initial={{ opacity: 0, y: 60 }} // start hidden and lower
        whileInView={{ opacity: 1, y: 0 }} // fade in and move up
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
        className="my-16 flex w-full border-b-2 border-foreground-200 text-foreground"
      >
        <div className="hidden flex-1 lg:block lg:pl-6">
          <div className="relative aspect-auto min-h-[720px]">
            <Image
              src={feedback}
              alt="Meet with your interviewer"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="my-auto flex-1 lg:pb-8">
          <div className="flex max-w-3xl flex-col px-6 lg:ml-auto lg:px-20">
            <div className="tracking-tighter font-semibold text-3xl leading-tight lg:text-6xl">
              Instant Feedback
            </div>

            {/* Mobile Image */}
            <div className="relative block aspect-auto min-h-64 py-8 lg:hidden">
              <Image
                src={feedback}
                alt="Meet with your interviewer"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>

            <p className="text-base font-light text-foreground/90 lg:pt-6 lg:text-2xl">
              Get detailed insights and improvement tips from experienced
              mentors. Our experts evaluate your answers, communication style,
              and problem-solving approach in real-time. You’ll receive
              structured feedback highlighting strengths, weak points, and
              actionable steps to improve. Each session ends with personalized
              advice to help you perform confidently in your next real
              interview.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default HowItWorks;
