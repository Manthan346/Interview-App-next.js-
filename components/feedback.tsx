"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";

const CompaniesAndTestimonials = () => {
  const companies = [
    {
      name: "Facebook",
      logo: "https://cdn.worldvectorlogo.com/logos/facebook-2020-2-1.svg",
    },
    {
      name: "Microsoft",
      logo: "https://cdn.worldvectorlogo.com/logos/microsoft-6.svg",
    },
    { name: "Uber", logo: "https://cdn.worldvectorlogo.com/logos/uber-2.svg" },
    {
      name: "OpenAI",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    },
    {
      name: "Netflix",
      logo: "https://cdn.worldvectorlogo.com/logos/netflix-3.svg",
    },
    {
      name: "Asana",
      logo: "https://cdn.worldvectorlogo.com/logos/asana-1.svg",
    },
    {
      name: "Airbnb",
      logo: "https://cdn.worldvectorlogo.com/logos/airbnb-2.svg",
    },
    {
      name: "Stripe",
      logo: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }} // start hidden and lower
      whileInView={{ opacity: 1, y: 0 }} // fade in and move up
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
      className="my-20 flex flex-col items-center text-black"
    >
      {/* Title */}
      <h3 className="text-center text-lg lg:text-2xl">
        Our interviewers and mentors have worked at:
      </h3>

      {/* Company Logos */}
      <div className="mt-10 grid w-full max-w-6xl grid-cols-3 gap-6 px-8 lg:grid-cols-4 lg:px-24">
        {companies.map((company, index) => (
          <div key={index} className="flex items-center justify-center h-24">
            <img
              src={company.logo}
              alt={company.name}
              className="object-contain h-full w-auto opacity-80 hover:opacity-100 transition"
            />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-20 px-6 sm:px-10 md:px-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-7xl">
          Take the guesswork out of prepping for technical interviews.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mt-4 text-foreground/90 max-w-2xl">
          Start practicing with experts today.
        </p>
        <Button
          variant="default"
          className="flex items-center justify-center gap-3 bg-primary mt-5 lg:mt-8 sm:mt-14 mb-6 sm:mb-8 text-lg sm:text-xl md:text-2xl cursor-pointer text-primary-foreground h-14 sm:h-16 md:h-20 px-8 sm:px-12 hover:opacity-90"
        >
          <Link href="/interview">Give it a try</Link>
        </Button>
      </div>
    </motion.section>
  );
};

export default CompaniesAndTestimonials;
