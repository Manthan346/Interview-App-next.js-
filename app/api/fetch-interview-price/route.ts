import prisma from "@/db";
import { NextRequest } from "next/server";

type ExperienceType = "FRESHER" | "SENIOR";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const experience = searchParams.get("experience");

  if (!experience) {
    throw new Error("Experience is required");
  }

  const pricing = await prisma.pricing.findFirst({
    where: {
      experience: experience as ExperienceType,
    },
    select: {
      id: true,
      experience: true,
      priceInPaise: true,
    },
  });

  if (!pricing?.experience) {
    throw new Error("Incorrect experience params");
  }

  const priceInRs = pricing.priceInPaise / 100;
  return Response.json(
    {
      id: pricing.id,
      experience: pricing.experience,
      price: priceInRs,
    },
    {
      status: 200,
    }
  );
}
