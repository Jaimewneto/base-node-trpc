import { Insertable, Selectable, Updateable } from "kysely";

import { UserTable } from "./users";

export interface Database {
    users: UserTable;
}

export type Record<T extends keyof Database> = Selectable<Database[T]>;
export type NewRecord<T extends keyof Database> = Insertable<Database[T]>;
export type RecordUpdate<T extends keyof Database> = Updateable<Database[T]>;
