import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./trpc/router";
import { createContext } from "./trpc/context";
import { serve } from "@hono/node-server";
import { client } from "./database/client";

export const app = new Hono();

app.use(
    "/trpc/*",
    trpcServer({
        router: appRouter,
        createContext,
    }),
);

serve({
    fetch: app.fetch,
    port: (process.env.PORT && parseInt(process.env.PORT)) || 3000,
});

console.info(`✅ Servidor ouvindo na porta 3000`);

// Encerra conexões com o banco ao finalizar a aplicação
const shutdown = async () => {
    console.info("🛑 Encerrando app... limpando conexões com o banco.");
    await client.destroy();
    process.exit(0);
};

process.on("SIGINT", shutdown); // Ctrl+C
process.on("SIGTERM", shutdown); // kill, Docker stop, etc.
