import { Kysely } from 'kysely';

import { Database } from '../database/schema';

import { User, NewUser, UserUpdate } from '../database/schema/user';

import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository<Database['user'], User, NewUser, UserUpdate> {
    constructor(db: Kysely<Database>) {
        super(db, 'user');
    }

    // If additional methods are needed (beyond the ones in BaseRepository), add them here
}
