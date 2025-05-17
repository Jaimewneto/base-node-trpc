import { z } from "zod";

const PostgresComparisonOperators = z.enum([
    "=",
    "!=",
    "<>",
    ">",
    ">=",
    "<",
    "<=",
    "LIKE",
    "NOT LIKE",
    "ILIKE",
    "NOT ILIKE",
    "IN",
    "NOT IN",
    "IS NULL",
    "IS NOT NULL",
    "BETWEEN",
    "NOT BETWEEN",
    "SIMILAR TO",
    "NOT SIMILAR TO",
]);

const PostgresOperator = z
    .string()
    .refine((val) => PostgresComparisonOperators.options.includes(val.toUpperCase() as any), { message: "Operador não suportado" })
    .transform((val) => val.toUpperCase() as any);

export const ConditionZodSchema = z.object({
    field: z.string(),
    operator: PostgresOperator,
    unaccent: z.boolean().optional(),

    /**
     * Campo `value` suporta múltiplos tipos de dados para maior flexibilidade:
     * - `string`: Para valores textuais.
     * - `number`: Para valores numéricos.
     * - `boolean`: Para valores verdadeiros ou falsos.
     * - `null`: Para representar ausência de valor.
     * - `string[] | number[]`: Para listas de valores textuais ou numéricos.
     */
    value: z.union([z.string(), z.number(), z.boolean(), z.null(), z.array(z.union([z.string(), z.number()]))]),
});

export const ClauseZodSchema: z.ZodType<any> = z.object({
    junction: z.enum(["and", "or"]),
    conditions: z.array(z.lazy(() => z.union([ConditionZodSchema, ClauseZodSchema]))),
});

// Validação para OrderBy
export const OrderBySchema = z.object({
    field: z.string(),
    direction: z.enum(["asc", "desc"]),
});

export const OrderByArraySchema = z.array(OrderBySchema);

export const ClauseSortSchema = z.object({
    clause: z
        .object({
            junction: z.enum(["and", "or"]),
            conditions: z.array(
                z.union([
                    ConditionZodSchema,
                    z.object({
                        junction: z.enum(["and", "or"]),
                        conditions: z.array(ConditionZodSchema),
                    }),
                ]),
            ),
        })
        .optional(),
    sort: OrderByArraySchema.optional(),
});
