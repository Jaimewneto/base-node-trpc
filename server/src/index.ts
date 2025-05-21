import Fastify from "fastify";

import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter } from "@/trpc/routes";
import { createContext } from "@/trpc/context";

import { client } from "@/database/client";

const fastify = Fastify({
    logger: true,
});

fastify.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: {
        router: appRouter,
        createContext,
    },
});

const port = Number(process.env.PORT) || 3000;

fastify.listen({ port }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});

const shutdown = async () => {
    console.info("Shutting down and closing db connection...");
    await client.destroy();
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
