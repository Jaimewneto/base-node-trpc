import { Kysely } from 'kysely';

import { Database } from '../database/schema';

import { Company, NewCompany, CompanyUpdate } from '../database/schema/company';

import { BaseRepository } from './BaseRepository';

export class CompanyRepository extends BaseRepository<Database['company'], Company, NewCompany, CompanyUpdate> {
    constructor(db: Kysely<Database>) {
        super(db, 'company');
    }

    // If additional methods are needed (beyond the ones in BaseRepository), add them here
}
