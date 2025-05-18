import { initTRPC, TRPCError } from "@trpc/server";

import { createContext } from "./context";

import { verify } from "../utils/auth";

const t = initTRPC.context<Awaited<ReturnType<typeof createContext>>>().create();

// Middleware de autenticação
const isAuthed = t.middleware(async ({ ctx, next }) => {
    const authHeader = ctx.req.raw.headers.get("authorization");

    if (!authHeader) throw new TRPCError({ code: "UNAUTHORIZED" });

    const token = authHeader.split(" ")[1];

    try {
        const payload = await verify(token);
        return next({
            ctx: {
                ...ctx,
                user: payload,
            },
        });
    } catch {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
});

export const router = t.router;
export const procedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

export { t };
