"use client";

import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useStore } from "@/lib/store/booking-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  User,
  Mail,
  Briefcase,
  Code,
  Award,
  Building2,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";

interface PricingResponse {
  id: string;
  experience: string;
  price: number;
}

interface BookInterviewPayload {
  company: string;
  role: string;
  experience: string;
  skillset: string;
  pricingId: string;
  userId: string;
}

const fetchPricing = async (experience: string): Promise<PricingResponse> => {
  const response = await fetch(
    `/api/fetch-interview-price?experience=${experience}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pricing");
  }

  return response.json();
};

const bookInterview = async (data: BookInterviewPayload): Promise<any> => {
  const response = await fetch("/api/book-interview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to book interview");
  }

  return response.json();
};

const Checkout = () => {
  const { bookingData, userData, resetBookingData } = useStore();
  const router = useRouter();

  const {
    data: session,
    isPending: sessionPending,
    error: sessionError,
    refetch,
  } = authClient.useSession();

  // Fetch pricing based on experience
  const {
    data: pricingData,
    isLoading: pricingLoading,
    error: pricingError,
  } = useQuery({
    queryKey: ["pricing", bookingData.experience],
    queryFn: () => fetchPricing(bookingData.experience),
    enabled: !!bookingData.experience,
  });

  const mutation = useMutation({
    mutationFn: bookInterview,
    onSuccess: (data) => {
      toast.success("Your mock interview has been booked successfully!");
      resetBookingData();
      // router.push("/success");
    },
    onError: (error: Error) => {
      toast.error("Failed to process payment. Please try again.");
    },
  });

  const handlePayment = () => {
    if (!pricingData || !session?.user?.id) {
      toast.error("Missing required information");
      return;
    }

    const payload: BookInterviewPayload = {
      company:
        bookingData.company === "Other"
          ? bookingData.customCompany || ""
          : bookingData.company,
      role:
        bookingData.role === "Other"
          ? bookingData.customRole || ""
          : bookingData.role,
      experience: bookingData.experience,
      skillset: bookingData.skillset,
      pricingId: pricingData.id,
      userId: session.user.id,
    };

    mutation.mutate(payload);
  };

  const finalCompany =
    bookingData.company === "Other"
      ? bookingData.customCompany
      : bookingData.company;
  const finalRole =
    bookingData.role === "Other" ? bookingData.customRole : bookingData.role;

  // Calculate only the base fee
  const basePrice = pricingData?.price || 0;
  const totalPrice = basePrice;

  if (pricingLoading || sessionPending) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (pricingError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-4 sm:p-6 max-w-md w-full">
          <p className="text-destructive text-sm sm:text-base">
            Failed to load pricing information. Please try again.
          </p>
          <Button
            onClick={() => router.push("/interview")}
            className="mt-4 w-full"
            variant="outline"
          >
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <section className="min-h-screen mt-16 sm:mt-20 md:mt-28 bg-gradient-to-br from-background via-background to-muted/20 flex justify-center items-center p-3 sm:p-4 md:p-6">
        <div className="w-full max-w-2xl space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="text-center space-y-1 sm:space-y-2 px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Checkout
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Review your interview details and complete payment
            </p>
          </div>

          {/* Main Card */}
          <Card className="border-2 shadow-xl">
            <CardHeader className="bg-muted/50 p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* User Information */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-muted-foreground uppercase tracking-wide">
                  Personal Information
                </h3>
                <div className="grid gap-y-3 sm:gap-y-4 w-full">
                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Name
                      </p>
                      <p className="font-medium text-sm sm:text-base md:text-lg truncate">
                        {session?.user?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Email
                      </p>
                      <p className="font-medium text-sm sm:text-base md:text-lg truncate">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4 sm:my-6" />

              {/* Interview Details */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-muted-foreground uppercase tracking-wide">
                  Interview Details
                </h3>
                <div className="grid gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Company
                      </p>
                      <p className="font-semibold text-sm sm:text-base md:text-lg text-primary break-words">
                        {finalCompany}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Role
                      </p>
                      <p className="font-medium text-sm sm:text-base md:text-lg break-words">
                        {finalRole}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Experience Level
                      </p>
                      <p className="font-medium text-sm sm:text-base md:text-lg">
                        {bookingData.experience}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border">
                    <Code className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div className="w-full min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Skillset
                      </p>
                      <p className="font-medium text-sm sm:text-base md:text-lg break-words">
                        {bookingData.skillset}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4 sm:my-6" />

              {/* Pricing */}
              <div className="space-y-2 sm:space-y-3 p-4 sm:p-5 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/30">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-xs sm:text-sm md:text-base text-muted-foreground">
                    Mock Interview Session
                  </span>
                  <span className="font-medium text-sm sm:text-base">
                    ₹{basePrice.toFixed(2)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-base sm:text-lg md:text-xl font-bold gap-2">
                  <span>Total</span>
                  <span className="text-primary">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={mutation.isPending || !pricingData || !session?.user}
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              >
                {mutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    Processing Payment...
                  </span>
                ) : (
                  `Buy Now`
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => router.push("/interview")}
            className="w-full h-10 sm:h-11 text-sm sm:text-base"
            disabled={mutation.isPending}
          >
            ← Back to Edit Details
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
