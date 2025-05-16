import { z } from "zod";

import { initTRPC } from "@trpc/server";

import { createUserController, getUsersController, pingController } from "../controllers/UserController";

const t = initTRPC
  .context<Awaited<ReturnType<typeof import("./context")["createContext"]>>>()
  .create();

export const appRouter = t.router({
  ping: t.procedure.query(pingController),

  getUsers: t.procedure.query(getUsersController),

  createUser: t.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(({ input }) => createUserController(input)),
});

export type AppRouter = typeof appRouter;
