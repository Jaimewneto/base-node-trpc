import { UserService } from "@/services/UserService";

import { Where } from "@/types/where";

import { NewUser, User, UserUpdate } from "@/database/schema/user";

export class UserController {
    private userService = new UserService();

    async findUserById(id: string) {
        try {
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

    async createUser(input: NewUser) {
        try {
            return await this.userService.createUser(input);
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id: string, input: UserUpdate) {
        try {
            return await this.userService.updateUser(id, input);
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
