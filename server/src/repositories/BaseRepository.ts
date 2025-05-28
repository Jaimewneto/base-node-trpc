import { ulid } from 'ulid';

import { applyWhereToQuery } from '@/utils/where';

import { Where } from '@/types/query/where';

import {
    Kysely,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely';

import { QueryMany } from '@/types/query';

export class BaseRepository<
    TSchema,
    TSelectable extends Selectable<TSchema> = Selectable<TSchema>,
    TInsertable extends Insertable<TSchema> = Insertable<TSchema>,
    TUpdateable extends Updateable<TSchema> = Updateable<TSchema>
> {
    constructor(
        protected db: Kysely<any>,
        protected tableName: string
    ) { }

    async findOne<
        T = undefined,
        TableName extends string | undefined = undefined
    >(
        where?: Where<T extends undefined ? TSchema : T, TableName>
    ): Promise<TSelectable | null> {
        let query = this.db
            .selectFrom(this.tableName)
            .where('deleted_at', 'is', null);

        if (where) {
            query = applyWhereToQuery(query, where);
        }

        return query.selectAll().executeTakeFirst() as Promise<TSelectable | null>;
    }


    async findMany<
        T = undefined,
        TableName extends string | undefined = undefined
    >(
        params?: QueryMany<T extends undefined ? TSchema : T, TableName>
    ): Promise<TSelectable[]> {
        let query = this.db
            .selectFrom(this.tableName)
            .where('deleted_at', 'is', null);

        if (params?.where) {
            query = applyWhereToQuery(query, params.where);
        }

        // Aqui você poderia aplicar select, orderBy, limit, offset se quiser também

        return query.selectAll().execute() as Promise<TSelectable[]>;
    }


    async create(data: TInsertable): Promise<TSelectable> {
        return this.db
            .insertInto(this.tableName)
            .values({ ...data, id: ulid() })
            .returningAll()
            .executeTakeFirstOrThrow() as Promise<TSelectable>;
    }

    async update(id: string, data: TUpdateable): Promise<TSelectable> {
        return this.db
            .updateTable(this.tableName)
            .set(data)
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirstOrThrow() as Promise<TSelectable>;
    }

    async delete(id: string): Promise<void> {
        await this.db
            .updateTable(this.tableName)
            .set({ deleted_at: new Date() } as any)
            .where('id', '=', id)
            .executeTakeFirstOrThrow();
    }
}
