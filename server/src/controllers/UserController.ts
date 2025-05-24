import { UserService } from "@/services/UserService";

import { Where } from "@/types/where";

import { NewUser, User, UserUpdate } from "@/database/schema/user";

import { TRPCRequest } from "@/trpc/types";

import { IdentifierSchema, CreateSchema, PatchSchema } from "@/validation/UserValidation";

export class UserController {
    private userService = new UserService();

    async findUserById(req: TRPCRequest<IdentifierSchema>) {
        try {
            const { id } = req.input;
            return await this.userService.findUserById(id);
        } catch (error) {
            throw error;
        }
    }

    async findUsers({ where }: { where?: Where<User> }) {
        try {
            return await this.userService.findUsers();
        } catch (error) {
            throw error;
        }
    }

    async createUser(req: TRPCRequest<CreateSchema>) {
        try {
            const newUser: NewUser = req.input;

            return await this.userService.createUser(newUser);
        } catch (error) {
            throw error;
        }
    }

    async updateUser(req: TRPCRequest<PatchSchema>) {
        try {
            const userUpdate: UserUpdate = req.input;

            return await this.userService.updateUser(userUpdate);
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id: string) {
        try {
            return await this.userService.deleteUser(id);
        } catch (error) {
            throw error;
        }
    }
}
