import { createContext } from "@/trpc/context";

export type Context = Awaited<ReturnType<typeof createContext>>

// Requisição genérica de query/mutation protegida
export type TRPCRequest<TInput> = {
  ctx: Context & { user: string; role: string };
  input: TInput;
  type?: "query" | "mutation" | "subscription";
  path?: string;
};
