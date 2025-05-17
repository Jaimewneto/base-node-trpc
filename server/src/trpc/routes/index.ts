import { t } from "../trpc";

import { appPrivateRouter } from "./private";
import { appPublicRouter } from "./public";

export const appRouter = t.router({
    private: appPrivateRouter,
    public: appPublicRouter,
});

export type AppRouter = typeof appRouter;
