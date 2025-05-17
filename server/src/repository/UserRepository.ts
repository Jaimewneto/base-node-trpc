import { client } from "../database/client";

import { UserUpdate, User, NewUser } from "../database/schema/users";

export async function findUserById(id: number) {
    return await client
        .selectFrom("users")
        .where("id", "=", id)
        .selectAll()
        .executeTakeFirst();
}

export async function findPeople(criteria: Partial<User>) {
    let query = client.selectFrom("users");

    if (criteria.id) {
        query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
    }

    if (criteria.name) {
        query = query.where("name", "=", criteria.name);
    }

    return await query.selectAll().execute();
}

export async function updateUser(id: number, updateWith: UserUpdate) {
    await client
        .updateTable("users")
        .set(updateWith)
        .where("id", "=", id)
        .execute();
}

export async function createUser(user: NewUser) {
    return await client
        .insertInto("users")
        .values(user)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function deleteUser(id: number) {
    return await client
        .deleteFrom("users")
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirst();
}
