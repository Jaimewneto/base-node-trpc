import { z } from "zod";

const identifierSchema = z.object({ id: z.string() });

const passwordSchema = z.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial");

const createSchema = z.object({
    company_id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: passwordSchema,
});

const patchSchema = createSchema.partial().merge(identifierSchema);

export const UserValidation = {
    identifierSchema,
    createSchema,
    patchSchema,
};

export type IdentifierSchema = z.infer<typeof identifierSchema>;
export type CreateSchema = z.infer<typeof createSchema>;
export type PatchSchema = z.infer<typeof patchSchema>;
