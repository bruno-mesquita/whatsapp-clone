import { Elysia, t } from "elysia";
import { prisma } from "../database";
import { lucia } from "../lib/lucia-auth";
import { createUser } from "../services/create-user";

const AuthModel = new Elysia({ name: "Model.Auth" }).model({
  "auth.signUp": t.Object({
    name: t.String(),
    email: t.String(),
    password: t.String({
      minLength: 5,
    }),
  }),
  "auth.signIn": t.Object({
    email: t.String(),
    password: t.String({ minLength: 5 }),
  }),
});

export const auth = new Elysia({ prefix: "/auth" })
  .use(AuthModel)
  .decorate("auth", { createUser })
  .post(
    "/sign-up",
    async ({ body, set, auth }) => {
      await auth.createUser(body);
      set.status = "Created";
      return { ok: true };
    },
    { body: "auth.signUp" },
  )
  .post(
    "/sign-in",
    async ({ body, set }) => {
      const user = await prisma.user.findFirst({
        where: { email: body.email, password: body.password },
      });
      if (!user) {
        set.status === "Unauthorized";
        return { ok: false };
      }
      const session = await lucia.createSession(user.id, {});
      return { sessionId: session.id };
    },
    { body: "auth.signIn" },
  );
