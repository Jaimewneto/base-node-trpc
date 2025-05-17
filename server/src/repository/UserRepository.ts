import { UserUpdate, NewUser } from "../database/schema/users";

import { BaseRepo } from "./BaseRepository";

const schema = "users";

const findUserById = async (id: number) => {
    return await BaseRepo.findRecordByIdentifier({ id, schema });
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
    findUsers,
    updateUser,
    createUser,
    deleteUser,
};
