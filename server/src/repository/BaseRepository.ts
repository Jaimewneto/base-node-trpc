import { client } from "../database/client";

import { Database, NewRecord, RecordUpdate } from "../database/schema";

const findRecordByIdentifier = async <T extends keyof Database>({ id, schema }: { id: number; schema: T }) => {
    return await client
        .selectFrom(schema)
        .where("id", "=", id)
        .where("deleted_at", "is", null)
        .selectAll()
        .executeTakeFirst();
};

const findManyRecords = async <T extends keyof Database>({ schema }: { schema: T }) => {
    let query = client.selectFrom(schema);

    // fazer o query e pagination

    return await query.selectAll().where("deleted_at", "is", null).execute();
};

const createRecord = async <T extends keyof Database>({ data, schema }: { data: NewRecord<T>; schema: T }) => {
    return await client
        .insertInto(schema)
        .values(data)
        .returningAll()
        .executeTakeFirstOrThrow();
};

const updateRecord = async <T extends keyof Database>({ id, data, schema }: { id: number; data: RecordUpdate<T>; schema: T }) => {
    await client
        .updateTable(schema)
        .set(data)
        .where("id", "=", id)
        .returningAll()
        .execute();
};

const deleteRecord = async <T extends keyof Database>({ id, schema }: { id: number; schema: T }) => {
    return await client
        .updateTable(schema)
        .set({ deleted_at: new Date() })
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirst();
};

export const BaseRepo = {
    findRecordByIdentifier,
    findManyRecords,
    createRecord,
    updateRecord,
    deleteRecord,
};
