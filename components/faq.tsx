"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
function FAQ() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }} // start hidden and lower
      whileInView={{ opacity: 1, y: 0 }} // fade in and move up
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      id="faq"
      className="bg-foreground text-primary-foreground py-32 px-6 sm:px-10 md:px-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Side: Title */}
        <div className="flex flex-col justify-center">
          <div className="tracking-tighter pt-10 text-5xl sm:text-6xl font-semibold leading-tight">
            Frequently Asked Questions
          </div>
          <p className="mt-4 text-lg sm:text-xl text-primary-foreground/80">
            Everything you need to know about our platform and services.
          </p>
        </div>

        {/* Right Side: Accordion */}
        <div className="bg-foreground text-background rounded-2xl shadow-lg p-6 sm:p-8 ">
          <Accordion type="single" collapsible className="w-full space-y-3 ">
            <AccordionItem value="item-1" className="border-b border-muted">
              <AccordionTrigger className="text-lg font-medium">
                How does the platform work?
              </AccordionTrigger>
              <AccordionContent className="transition-all duration-300 ease-in-out overflow-hidden data-[state=closed]:max-h-0 data-[state=open]:max-h-40">
                <p className="text-muted-foreground">
                  After receiving your request, we’ll collect your work experience and interview preferences. Our
                  team then matches you with an industry expert — ideally from the same or a similar company —whose skills align with your goals. Once both parties confirm availability, the mock interview is
                  scheduled via Google Meet. To maintain privacy, both interviewer and interviewee remain
                  anonymous, and no video is used during the session. There is NO RECORDING of the
                  session as well.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-muted">
              <AccordionTrigger className="text-lg font-medium">
                Why should I do this?
              </AccordionTrigger>
              <AccordionContent className="transition-all duration-300 ease-in-out overflow-hidden data-[state=closed]:max-h-0 data-[state=open]:max-h-40">
                <p className="text-muted-foreground">
                  Because you deserve to face your real interview with confidence, not uncertainty. We are sure
                  that this will help you get better and ace your rounds.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-muted">
              <AccordionTrigger className="text-lg font-medium">
                What kind of questions can I expect?
              </AccordionTrigger>
              <AccordionContent className="transition-all duration-300 ease-in-out overflow-hidden data-[state=closed]:max-h-0 data-[state=open]:max-h-40">
                <p className="text-muted-foreground">
                  You will be interviewed as per the role you have applied for and your work experience.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-b border-muted">
              <AccordionTrigger className="text-lg font-medium">
                What is the duration of each interview and how is feedback given?
              </AccordionTrigger>
              <AccordionContent className="transition-all duration-300 ease-in-out overflow-hidden data-[state=closed]:max-h-0 data-[state=open]:max-h-40">
                <p className="text-muted-foreground">
                  Interviews typically last 30–45 minutes for non-developer roles and 90–100 minutes for
                  developer roles. Each session also includes time for you to ask questions and clarify doubts.
                  Feedback is shared either through a detailed written report (Word document) or via an
                  anonymous follow-up session on the same Google Meet link. Written feedback is usually
                  delivered within 48 hours of the interview.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="border-b border-muted">
              <AccordionTrigger className="text-lg font-medium">
                How should we sign up?
              </AccordionTrigger>
              <AccordionContent className="transition-all duration-300 ease-in-out overflow-hidden data-[state=closed]:max-h-0 data-[state=open]:max-h-40">
                <p className="text-muted-foreground">
                  To keep the process fair and confidential, both interviewers and candidates use anonymous
                  email IDs for sign-up.
                  Please make sure your email doesn’t include any personal details. This helps us protect your
                  privacy — MockbuddyIO isn’t responsible for any personal information shared voluntarily.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7" className="border-b border-muted">
              <AccordionTrigger className="text-lg font-medium">
                Can I schedule a follow-up session after feedback?
              </AccordionTrigger>
              <AccordionContent className="transition-all duration-300 ease-in-out overflow-hidden data-[state=closed]:max-h-0 data-[state=open]:max-h-40">
                <p className="text-muted-foreground">
                  Yes, absolutely. You can book another round and request to have the same interviewer,
                  so you can track your progress and focus on the areas identified in your feedback.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8" className="border-b border-muted">
              <AccordionTrigger className="text-lg font-medium">
                Who are we?
              </AccordionTrigger>
              <AccordionContent className="transition-all duration-300 ease-in-out overflow-hidden data-[state=closed]:max-h-0 data-[state=open]:max-h-40">
                <p className="text-muted-foreground">
                  We’re a tribe of engineers who believe opportunities should be earned, not handed.
                  No fluff, no bias but just pure merit. We help you prove your worth, one mock interview at a time.
                </p>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </div>
    </motion.section>
  );
}

export default FAQ;
