import prisma from "@/lib/prisma";

async function main(): Promise<void> {
  try {
    console.log("RESETING started...");

    await prisma.$transaction([
      prisma.$executeRaw`DROP TABLE IF EXISTS account CASCADE;`,
      prisma.$executeRaw`DROP TABLE IF EXISTS verificationtoken CASCADE;`,
      prisma.$executeRaw`DROP TABLE IF EXISTS session CASCADE;`,
      prisma.$executeRaw`DROP TABLE IF EXISTS post CASCADE;`,
      prisma.$executeRaw`DROP TABLE IF EXISTS comment CASCADE;`,
      // prisma.$executeRaw`DROP TABLE IF EXISTS like CASCADE;`,
      // prisma.$executeRaw`DROP TABLE IF EXISTS user CASCADE;`,
    ]);

    console.log("RESETING Successful...");
    console.log("RESETING Ended...");
  } catch (err) {
    console.error("Error performing reset operation: ", err);
  }
  process.exit(0);
}

void main();
