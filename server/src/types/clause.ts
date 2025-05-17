/* eslint-disable @typescript-eslint/ban-types */
// lembrar de adicionar os operadores no validador de schemas em src/validation/clause.ts

export type PostgresComparisonOperators =
    | "="
    | "!="
    | "<>"
    | ">"
    | ">="
    | "<"
    | "<="
    | "LIKE"
    | "NOT LIKE"
    | "ILIKE"
    | "NOT ILIKE"
    | "IN"
    | "NOT IN"
    | "IS"
    | "IS NOT"
    | "BETWEEN"
    | "NOT BETWEEN"
    | "SIMILAR TO"
    | "NOT SIMILAR TO";

type ValueTypes = string | number | boolean | bigint | null;

export type SmartField<T> = keyof T extends string ? keyof T | (string & {}) : string;

export interface Condition<T = unknown> {
    field: SmartField<T>;
    operator: Lowercase<PostgresComparisonOperators> | Uppercase<PostgresComparisonOperators>;
    value: ValueTypes | ValueTypes[];
    unaccent?: boolean;
}

export interface Clause<T = unknown> {
    junction: "and" | "or";
    conditions: (Condition<T> | Clause<T>)[];
}

export interface OrderBy<T = unknown> {
    field: keyof T | string;
    direction: "asc" | "desc";
}

/* 
const example: Clause = {
    junction: "or",
    conditions: [
        {
            junction: "and",
            conditions: [
                { field: "condicao1", operator: "=", value: "value1" },
                { field: "condicao2", operator: "=", value: "value2" },
            ],
        },
        {
            junction: "and",
            conditions: [
                { field: "condicao3", operator: "=", value: "value3" },
                { field: "condicao4", operator: "=", value: "value4" },
            ],
        },
    ],
};

const example2: Clause = {
    junction: "or",
    conditions: [
        { field: "condicao1", operator: "=", value: "value1" },
        { field: "condicao2", operator: "=", value: "value2" },
        {
            junction: "and",
            conditions: [
                { field: "condicao3", operator: "=", value: "value3" },
                { field: "condicao4", operator: "=", value: "value4" },
            ],
        },
    ],
};
 */
