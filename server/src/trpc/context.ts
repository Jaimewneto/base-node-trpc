import type { FastifyRequest } from "fastify";

export async function createContext({ req }: { req: FastifyRequest }) {
    return {
        req,
        headers: req.headers,
    };
}
