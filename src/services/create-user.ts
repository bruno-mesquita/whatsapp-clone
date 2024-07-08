import { prisma } from "../database";

export async function createUser(input: Input) {
  await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: input.password,
    },
  });
}

type Input = {
  name: string;
  email: string;
  password: string;
};
