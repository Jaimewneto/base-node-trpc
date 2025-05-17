import { UserUpdate, NewUser } from "../database/schema/users";

import { Clause } from "../types/clause";

import { BaseRepo } from "./BaseRepository";

const schema = "users";

const findUserById = async (id: number) => {
    return await BaseRepo.findRecordByIdentifier({ id, schema });
};

const findUser = async (clause: Clause) => {
    return await BaseRepo.findRecord({ schema, clause });
};

const findUsers = async () => {
    return await BaseRepo.findManyRecords({ schema });
};

const createUser = async (user: NewUser) => {
    return await BaseRepo.createRecord({ data: user, schema });
};

const updateUser = async (id: number, data: UserUpdate) => {
    data.updated_at = new Date();

    return await BaseRepo.updateRecord({ id, data, schema });
};

const deleteUser = async (id: number) => {
    return await BaseRepo.deleteRecord({ id, schema });
};

export const UserRepo = {
    findUserById,
    findUser,
    findUsers,
    updateUser,
    createUser,
    deleteUser,
};
