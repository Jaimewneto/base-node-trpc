import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("user")
        .addColumn("id", "varchar(26)", (col) => col.primaryKey())
        .addColumn("name", "varchar(255)", (col) => col.notNull())
        .addColumn("email", "varchar(255)", (col) => col.unique().notNull())
        .addColumn("password", "varchar(255)", (col) => col.notNull())
        .addColumn("created_at", "timestamptz", (col) =>
            col.defaultTo(sql`now()`),
        )
        .addColumn("updated_at", "timestamptz", (col) =>
            col.defaultTo(sql`now()`)
        )
        .addColumn("deleted_at", "timestamptz", (col) => col.defaultTo(null))
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("user").execute();
}
