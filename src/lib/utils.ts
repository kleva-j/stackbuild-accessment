import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { faker } from "@faker-js/faker";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUser = () => {
  const sex = faker.person.sex() as "female" | "male";
  const fullName = faker.person.fullName({ sex });
  const [firstName, lastName] = fullName.split(" ");
  const email = faker.internet.email({ firstName, lastName });
  const id = faker.string.uuid();
  return { id, firstName, lastName, email };
};

export const generatePost = (userId: string, size: number = 1) => {
  return Array.from({ length: size }, () => ({
    title: faker.lorem.sentence({ min: 2, max: 5 }),
    content: faker.lorem.sentences({ min: 1, max: 5 }),
    published: faker.datatype.boolean(),
    userId,
  }));
};
