import * as UserRepo from '../repository/UserRepository';
import { NewUser } from '../database/schema';
import { hash } from 'bcryptjs'; // exemplo de lógica de negócio

export async function getUsers() {
    return await UserRepo.findPeople({});
}

export async function createUser(input: { name: string; email: string; password: string }) {
    const hashedPassword = await hash(input.password, 10);

    const user: NewUser = {
        name: input.name,
        email: input.email,
        password: hashedPassword,
    };

    return await UserRepo.createUser(user);
}
