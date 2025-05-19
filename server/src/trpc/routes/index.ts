import { router } from "..";

import { appPrivateRouter } from "./private";
import { appPublicRouter } from "./public";

export const appRouter = router({
    private: appPrivateRouter,
    public: appPublicRouter,
});

export type AppRouter = typeof appRouter;
