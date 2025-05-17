import { initTRPC } from "@trpc/server";

import { createContext } from "./context";

const t = initTRPC.context<Awaited<ReturnType<typeof createContext>>>().create();

export { t };
