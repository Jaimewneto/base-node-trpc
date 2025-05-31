import { z } from "zod";

const identifierSchema = z.object({ id: z.string() });

const createSchema = z.object({
    name: z.string(),
    //document: z.string(),
});

const patchSchema = createSchema.partial().merge(identifierSchema);

export const CompanyValidation = {
    identifierSchema,
    createSchema,
    patchSchema,
};

export type IdentifierSchema = z.infer<typeof identifierSchema>;
export type CreateSchema = z.infer<typeof createSchema>;
export type PatchSchema = z.infer<typeof patchSchema>;
