"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "@/lib/store/booking-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

const companies = [
  "Google",
  "Amazon",
  "Microsoft",
  "Meta",
  "Netflix",
  "Apple",
  "Adobe",
  "Uber",
  "Airbnb",
  "Stripe",
  "LinkedIn",
  "PayPal",
  "Salesforce",
  "Intel",
  "Oracle",
  "Cisco",
  "IBM",
  "Spotify",
  "Dropbox",
  "Other",
];

const roles = [
  "Frontend Engineer",
  "Backend Engineer",
  "Fullstack Engineer",
  "DevOps Engineer",
  "Data Engineer",
  "Machine Learning Engineer",
  "Software Engineer",
  "System Design Specialist",
  "SDET (Test Engineer)",
  "Other",
];

interface BookingFormData {
  company: string;
  customCompany?: string;
  role: string;
  customRole?: string;
  experience: string;
  skillset: string;
}

const BookSession = () => {
  const { bookingData, setBookingData, isBookingComplete } = useStore();
  const [showCustomCompany, setShowCustomCompany] = useState(
    bookingData.company === "Other"
  );
  const [showCustomRole, setShowCustomRole] = useState(
    bookingData.role === "Other"
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: bookingData,
  });

  const watchCompany = watch("company");
  const watchRole = watch("role");

  // Update Zustand store on form changes
  useEffect(() => {
    const subscription = watch((value) => {
      setBookingData(value as Partial<BookingFormData>);
    });
    return () => subscription.unsubscribe();
  }, [watch, setBookingData]);

  const onSubmit = (data: BookingFormData) => {
    if (isBookingComplete()) {
      router.push("/checkout");
    }
  };

  return (
    <div>
      <section className="min-h-screen bg-background text-foreground flex justify-center items-center p-6 overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card border rounded-2xl p-8 sm:p-10 shadow-md w-full max-w-lg space-y-8 sm:my-10 my-16"
        >
          <h2 className="text-3xl font-semibold text-center mb-6">
            Book Your Mock Interview
          </h2>

          {/* Company */}
          <div className="w-full">
            <Label>Company *</Label>
            <Select
              value={watchCompany}
              onValueChange={(value) => {
                setValue("company", value);
                setShowCustomCompany(value === "Other");
                if (value !== "Other") {
                  setValue("customCompany", "");
                }
              }}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent className="w-full max-h-70 overflow-y-auto">
                {companies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.company && (
              <p className="text-sm text-destructive mt-1">
                {errors.company.message}
              </p>
            )}
            {showCustomCompany && (
              <Input
                placeholder="Specify company"
                className="mt-2"
                {...register("customCompany", {
                  required:
                    watchCompany === "Other" ? "Please specify company" : false,
                })}
              />
            )}
            {errors.customCompany && (
              <p className="text-sm text-destructive mt-1">
                {errors.customCompany.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <Label>Role *</Label>
            <Select
              value={watchRole}
              onValueChange={(value) => {
                setValue("role", value);
                setShowCustomRole(value === "Other");
                if (value !== "Other") {
                  setValue("customRole", "");
                }
              }}
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive mt-1">
                {errors.role.message}
              </p>
            )}
            {showCustomRole && (
              <Input
                placeholder="Specify role"
                className="mt-2"
                {...register("customRole", {
                  required:
                    watchRole === "Other" ? "Please specify role" : false,
                })}
              />
            )}
            {errors.customRole && (
              <p className="text-sm text-destructive mt-1">
                {errors.customRole.message}
              </p>
            )}
          </div>

          {/* Experience */}
          <div>
            <Label>Experience *</Label>
            <Select
              value={bookingData.experience}
              onValueChange={(value) => setValue("experience", value)}
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Select Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FRESHER">
                  Fresher (Less than 1 year)
                </SelectItem>
                <SelectItem value="SENIOR">
                  Experience (More than 1 year)
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.experience && (
              <p className="text-sm text-destructive mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Skillset */}
          <div>
            <Label>Skills (max 100 chars) *</Label>
            <Textarea
              className="mt-2"
              maxLength={100}
              placeholder="React, Node.js, System Design..."
              {...register("skillset", {
                required: "Skillset is required",
                maxLength: {
                  value: 100,
                  message: "Skillset cannot exceed 100 characters",
                },
              })}
            />
            {errors.skillset && (
              <p className="text-sm text-destructive mt-1">
                {errors.skillset.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:opacity-90"
          >
            Proceed to Checkout
          </Button>
        </form>
      </section>
    </div>
  );
};

export default BookSession;
