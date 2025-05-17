import { t } from "../trpc";

import { userRouter } from "./user";

export const appRouter = t.router({
    user: userRouter, // acessível via user.getUsers, user.createUser, etc.
});

export type AppRouter = typeof appRouter;
