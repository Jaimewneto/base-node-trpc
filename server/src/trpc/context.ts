import type { Context } from "hono";

import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = async (
    _opts: FetchCreateContextFnOptions,
    c: Context,
) => {
    return {
        req: c.req,
        env: c.env,
        headers: c.req.raw.headers,
    };
};

export type ContextType = Awaited<ReturnType<typeof createContext>>;
