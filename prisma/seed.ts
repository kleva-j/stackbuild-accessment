/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */

import { faker } from "@faker-js/faker";
import prisma from "@/lib/prisma";

async function main() {
  try {
    await prisma.user.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user
      .create({
        data: {
          name: faker.person.fullName(),
          email: "faker@example.com",
          posts: {
            createMany: {
              data: [
                {
                  title: faker.lorem.sentence({ min: 2, max: 5 }),
                  content: faker.lorem.sentences({ min: 1, max: 5 }),
                  published: true,
                },
                {
                  title: faker.lorem.sentence({ min: 2, max: 5 }),
                  content: faker.lorem.sentences({ min: 1, max: 5 }),
                  published: true,
                },
                {
                  title: faker.lorem.sentence({ min: 2, max: 5 }),
                  content: faker.lorem.sentences({ min: 1, max: 5 }),
                  published: true,
                },
              ],
            },
          },
        },
      })
      .then((post) => console.log("Post Created: ", post));
  } catch (err) {
    console.log(err);
  }
}

main()
  .catch((e) => {})
  .finally(async () => await prisma.$disconnect());
