import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { auth } from "./routes/auth";
import { users } from "./routes/users";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(auth)
  .use(users)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
