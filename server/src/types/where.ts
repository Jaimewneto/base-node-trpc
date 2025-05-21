/* eslint-disable @typescript-eslint/ban-types */
// lembrar de adicionar os operadores no validador de schemas em src/validation/where.ts

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

type Field<T> = keyof T;
type AnyField = string;

type Operator = Lowercase<PostgresComparisonOperators> | Uppercase<PostgresComparisonOperators>;

type Junctions = "and" | "or";

export type Condition<T = never> = [T] extends [never]
  ? { field: AnyField; operator: Operator; value: ValueTypes | ValueTypes[]; unaccent?: boolean }
  : { field: Field<T>; operator: Operator; value: ValueTypes | ValueTypes[]; unaccent?: boolean };

export type Where<T = never> = [T] extends [never]
  ? { junction: Junctions; conditions: (Condition | Where)[] }
  : { junction: Junctions; conditions: (Condition<T> | Where<T>)[] };

export interface OrderBy<T = unknown> {
    field: keyof T | string;
    direction: "asc" | "desc";
}

/* 
const example: Where = {
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

const example2: Where = {
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
