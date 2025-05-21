import { Kysely } from 'kysely';

import { Database } from '../database/schema';

import { User, NewUser, UserUpdate } from '../database/schema/users';

import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository<Database['users'], User, NewUser, UserUpdate> {
    constructor(db: Kysely<Database>) {
        super(db, 'users');
    }

    // If additional methods are needed (beyond the ones in BaseRepository), add them here
}
