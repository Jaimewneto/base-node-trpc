import Fastify from "fastify";

import "dotenv/config";

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

const port = Number(process.env.PORT);

fastify.listen({ port }, (err, address) => {
    if (err) {
        client.destroy();

        fastify.log.error(err);

        process.exit(1);
    }

    console.info(`Server listening on ${address}`);
});

const shutdown = async () => {
    console.info("Shutting down and closing db connection...");

    await client.destroy();

    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
