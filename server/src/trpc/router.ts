import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { db } from "../database/db";

const t = initTRPC
  .context<Awaited<ReturnType<typeof import("./context")["createContext"]>>>()
  .create();

export const appRouter = t.router({
  ping: t.procedure.query(() => "pong"),

  getUsers: t.procedure.query(async () => {
    return db.selectFrom("users").selectAll().execute();
  }),

  createUser: t.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      return db
        .insertInto("users")
        .values({
          id: crypto.randomUUID(),
          name: input.name,
          email: input.email,
          password: input.password, // hash depois!
        })
        .returningAll()
        .executeTakeFirst();
    }),
});

export type AppRouter = typeof appRouter;
