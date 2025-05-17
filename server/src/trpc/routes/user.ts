import { z } from "zod";

import { t } from "../trpc";

import {
  createUserController,
  getUsersController,
  pingController,
} from "../../controllers/UserController";

export const userRouter = t.router({
  ping: t.procedure.query(pingController),

  getUsers: t.procedure.query(getUsersController),

  createUser: t.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(({ input }) => createUserController(input)),
});
