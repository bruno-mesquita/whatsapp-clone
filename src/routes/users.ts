import { Elysia, t } from "elysia";
import { prisma } from "../database";

export const users = new Elysia({
  prefix: "/users",
}).get("/", async () => {
  const users = await prisma.user.findMany();
  return users;
});
