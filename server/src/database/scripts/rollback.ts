import "dotenv/config";

import { promises as fs } from "fs";
import path from "path";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Migrator, FileMigrationProvider } from "kysely";

const db = new Kysely<any>({
    dialect: new PostgresDialect({
        pool: new Pool({
            host: process.env.DATABASE_HOST || "localhost",
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
        }),
    }),
});

const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(__dirname, "..", "migrations"),
    }),
});

async function rollbackMigration() {
    const { error, results } = await migrator.migrateDown();

    if (error) {
        console.error("Rollback failed:", error);
        process.exit(1);
    }

    results?.forEach((result) => {
        if (result.status === "Success") {
            console.log(
                `Rollback of "${result.migrationName}" was executed successfully.`,
            );
        } else {
            console.error(`Rollback of "${result.migrationName}" failed.`);
        }
    });

    await db.destroy();
}

rollbackMigration().catch((err) => {
    console.error("Error during rollback:", err);
    process.exit(1);
});
