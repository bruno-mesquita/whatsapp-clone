import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";

import { prisma } from "../database";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter);
