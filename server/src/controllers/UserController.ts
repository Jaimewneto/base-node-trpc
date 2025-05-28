import { UserService } from "@/services/UserService";

import { NewUser, User, UserUpdate } from "@/database/schema/user";

import { TRPCProtectedRequest, TRPCPublicRequest } from "@/trpc/types";

import { IdentifierSchema, CreateSchema, PatchSchema } from "@/validation/UserValidation";
import { WhereSortSchemaSchema } from "@/validation/WhereValidation";
import { QueryMany } from "@/types/query";

export class UserController {
    private userService = new UserService();

    async findUserById(req: TRPCProtectedRequest<IdentifierSchema>) {
        try {
            const { id } = req.input;
            return await this.userService.findUserById(id);
        } catch (error) {
            throw error;
        }
    }

    async findUsers(req: TRPCProtectedRequest<WhereSortSchemaSchema>) {
        try {
            const query: QueryMany<User> = {
                where: {
                    junction: "and",
                    conditions: [{ field: "created_at", operator: ">", value: new Date().toDateString() }],
                },
                orderBy: [{ field: "created_at", direction: "desc" }],
            };

            return await this.userService.findUsers(query);
        } catch (error) {
            throw error;
        }
    }

    async createUser(req: TRPCPublicRequest<CreateSchema>) {
        try {
            const newUser: NewUser = req.input;

            return await this.userService.createUser(newUser);
        } catch (error) {
            throw error;
        }
    }

    async updateUser(req: TRPCProtectedRequest<PatchSchema>) {
        try {
            const userUpdate: UserUpdate = req.input;

            return await this.userService.updateUser(userUpdate);
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(req: TRPCProtectedRequest<IdentifierSchema>) {
        try {
            const { id } = req.input;

            return await this.userService.deleteUser(id);
        } catch (error) {
            throw error;
        }
    }
}
