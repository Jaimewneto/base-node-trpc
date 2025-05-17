import { t } from "../../trpc";

import { userRouter } from "./user";

export const appPublicRouter = t.router({
    user: userRouter, // acessível via user.getUsers, user.createUser, etc.
});

export type AppPublicRouter = typeof appPublicRouter;
