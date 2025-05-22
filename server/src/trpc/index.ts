import { initTRPC, TRPCError } from "@trpc/server";
import { createContext } from "@/trpc/context";

import { verify } from "@/utils/auth";

const t = initTRPC.context<typeof createContext>().create();

const isAuthed = t.middleware(async ({ ctx, next }) => {
    const authHeader = ctx.headers.authorization;

    if (!authHeader) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Missing Authorization header" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = await verify(token);
        return next({
            ctx: {
                ...ctx,
                user: payload,
            },
        });
    } catch (err: any) {
        if (err.code === "ERR_JWT_EXPIRED") {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Expired token" });
        }

        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
    }
});

export const router = t.router;
export const procedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export { t };
