import { Expression, ExpressionBuilder, SelectQueryBuilder, sql, SqlBool } from 'kysely';

import { Where, Condition, PostgresComparisonOperators } from '@/types/where';

/**
 * Aplica uma condição a uma query Kysely
 */
function applyCondition<DB, TB extends keyof DB, Row = DB[TB]>(
    eb: ExpressionBuilder<DB, TB>,
    condition: Condition<Row>
): Expression<SqlBool> {
    const { field, operator, value, unaccent } = condition;

    const getField = () => {
        if (unaccent) {
            return sql<string>`unaccent(${sql.ref(field.toString())})`;
        }
        return sql.ref(field.toString());
    };

    const formatArray = (arr: any[]) => {
        return sql`(${sql.join(arr.map(v => sql.lit(v)), sql`, `)})`;
    };

    switch (operator.toLowerCase() as Lowercase<PostgresComparisonOperators>) {
        case '=':
            return sql<SqlBool>`${getField()} = ${value}`;
        case '!=':
        case '<>':
            return sql<SqlBool>`${getField()} <> ${value}`;
        case '>':
            return sql<SqlBool>`${getField()} > ${value}`;
        case '>=':
            return sql<SqlBool>`${getField()} >= ${value}`;
        case '<':
            return sql<SqlBool>`${getField()} < ${value}`;
        case '<=':
            return sql<SqlBool>`${getField()} <= ${value}`;
        case 'like':
            return sql<SqlBool>`${getField()} LIKE ${value}`;
        case 'not like':
            return sql<SqlBool>`${getField()} NOT LIKE ${value}`;
        case 'ilike':
            return sql<SqlBool>`${getField()} ILIKE ${value}`;
        case 'not ilike':
            return sql<SqlBool>`${getField()} NOT ILIKE ${value}`;
        case 'in':
            if (Array.isArray(value) && value.length > 0) {
                return sql<SqlBool>`${getField()} IN ${formatArray(value)}`;
            } else if (Array.isArray(value) && value.length === 0) {
                return sql<SqlBool>`false`; // IN com array vazio é sempre falso
            }
            return sql<SqlBool>`${getField()} = ${value}`; // Se não for array, trata como igualdade
        case 'not in':
            if (Array.isArray(value) && value.length > 0) {
                return sql<SqlBool>`${getField()} NOT IN ${formatArray(value)}`;
            } else if (Array.isArray(value) && value.length === 0) {
                return sql<SqlBool>`true`; // NOT IN com array vazio é sempre verdadeiro
            }
            return sql<SqlBool>`${getField()} <> ${value}`;
        case 'is':
            if (value === null) {
                return sql<SqlBool>`${getField()} IS NULL`;
            }
            return sql<SqlBool>`${getField()} IS ${value}`;
        case 'is not':
            if (value === null) {
                return sql<SqlBool>`${getField()} IS NOT NULL`;
            }
            return sql<SqlBool>`${getField()} IS NOT ${value}`;
        case 'between':
            if (Array.isArray(value) && value.length === 2) {
                return sql<SqlBool>`${getField()} BETWEEN ${value[0]} AND ${value[1]}`;
            }
            throw new Error('BETWEEN operator requires an array with exactly 2 values');
        case 'not between':
            if (Array.isArray(value) && value.length === 2) {
                return sql<SqlBool>`${getField()} NOT BETWEEN ${value[0]} AND ${value[1]}`;
            }
            throw new Error('NOT BETWEEN operator requires an array with exactly 2 values');
        case 'similar to':
            return sql<SqlBool>`${getField()} SIMILAR TO ${value}`;
        case 'not similar to':
            return sql<SqlBool>`${getField()} NOT SIMILAR TO ${value}`;
        default:
            throw new Error(`Unsupported operator: ${operator}`);
    }
}

/**
 * Processa uma cláusula de filtro recursivamente
 */
function processWhere<DB, TB extends keyof DB, Row = DB[TB]>(
    eb: ExpressionBuilder<DB, TB>,
    where: Where<Row>
): Expression<SqlBool> {
    const { junction, conditions } = where;

    if (!conditions.length) {
        return sql<SqlBool>`true`;
    }

    const expressions = conditions.map(condition => {
        if ('junction' in condition) {
            return processWhere<DB, TB, Row>(eb, condition as Where<Row>);
        } else {
            return applyCondition<DB, TB, Row>(eb, condition as Condition<Row>);
        }
    });

    if (junction === 'and') {
        return expressions.length === 1
            ? expressions[0]
            : sql<SqlBool>`(${sql.join(expressions, sql` AND `)})`;
    } else {
        return expressions.length === 1
            ? expressions[0]
            : sql<SqlBool>`(${sql.join(expressions, sql` OR `)})`;
    }
}


/**
 * Aplica uma cláusula de filtro a uma query Kysely
 */
export function applyWhereToQuery<DB, TB extends keyof DB, O, Row = DB[TB]>(
    query: SelectQueryBuilder<DB, TB, O>,
    where?: Where<Row>
): SelectQueryBuilder<DB, TB, O> {
    if (!where) {
        return query;
    }

    return query.where((eb) => {
        const result = processWhere(eb, where);
        return result;
    });
}

/**
 * Exemplo de uso:
 * 
 * const query = client.selectFrom('users');
 * const filteredQuery = applyWhereToQuery(query, myWhere);
 * const results = await filteredQuery.selectAll().execute();
 */
