import { z } from "zod";

const identifierSchema = z.object({ id: z.number().int() });

const passwordSchema = z.string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial");

const createSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: passwordSchema,
});

const patchSchema = createSchema.partial();

export const UserValidation = {
    identifierSchema,
    createSchema,
    patchSchema,
};
