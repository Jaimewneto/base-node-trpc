import { ulid } from 'ulid';

import { applyWhereToQuery } from '@/utils/where';

import { Where } from '@/types/where';
import {
    Kysely,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely';

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

    async findOne(Where?: Where<TSchema>): Promise<TSelectable | undefined> {
        let query = this.db
            .selectFrom(this.tableName)
            .where('deleted_at', 'is', null);

        if (Where) {
            query = applyWhereToQuery(query, Where);
        }

        return query.selectAll().executeTakeFirst() as Promise<TSelectable | undefined>;
    }

    async findMany(Where?: Where<TSchema>): Promise<TSelectable[]> {
        let query = this.db
            .selectFrom(this.tableName)
            .where('deleted_at', 'is', null);

        if (Where) {
            query = applyWhereToQuery(query, Where);
        }

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
