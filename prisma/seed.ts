/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */

import { generatePost, generateUser } from "@/lib/utils";

import prisma from "@/lib/prisma";

async function main() {
  try {
    const { id: userId1 } = generateUser();
    const { id: userId2 } = generateUser();

    await prisma.$transaction([
      prisma.post.createMany({ data: generatePost(userId1, 2) }),
      prisma.post.createMany({ data: generatePost(userId2, 3) }),
    ]);
  } catch (err) {
    console.log(err);
  }
}

main()
  .catch((e) => {})
  .finally(async () => await prisma.$disconnect());
