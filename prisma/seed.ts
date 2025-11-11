import { pricing } from "@/db/data/pricing";
import prisma from "@/db";

async function main() {
  await prisma.pricing.deleteMany();

  for (const item of pricing) {
    await prisma.pricing.create({
      data: {
        id: item.id,
        experience: item.experience,
        priceInPaise: item.priceInPaise,
        createAt: item.createdAt,
        updatedAt: item.updatedAt,
      },
    });
  }

  console.log("Pricing data seeded successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
