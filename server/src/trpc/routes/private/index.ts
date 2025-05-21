import { router } from "../..";

import { userRouter } from "./user";

export const appPrivateRouter = router({
    user: userRouter, // access via user.getUsers, user.createUser, etc.
});

export type AppPrivateRouter = typeof appPrivateRouter;
