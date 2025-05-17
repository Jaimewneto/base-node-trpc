import { t } from "../../trpc";

import { userRouter } from "./user";

export const appPrivateRouter = t.router({
    user: userRouter, // acessível via user.getUsers, user.createUser, etc.
});

export type AppPrivateRouter = typeof appPrivateRouter;
