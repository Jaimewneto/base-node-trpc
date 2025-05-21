import { router, protectedProcedure } from "../..";

import { UserController } from "@/controllers/UserController";

import { UserValidation } from "@/validation/UserValidation";
import { WhereSortValidation } from "@/validation/WhereValidation";

import { Where } from "@/types/where";
import { User } from "@/database/schema/users";

// Aqui criamos a instância
const userController = new UserController();

export const userRouter = router({
    getUser: protectedProcedure
        .input(UserValidation.identifierSchema)
        .query(({ input }) => userController.findUserById(input.id)),

    getUsers: protectedProcedure
        .input(WhereSortValidation.WhereSortSchema || undefined)
        .query(({ input }) => userController.findUsers({ where: input.where as Where<User> })),

    updateUser: protectedProcedure
        .input(UserValidation.patchSchema)
        .mutation(({ input }) => userController.updateUser(input.id, input)),

    deleteUser: protectedProcedure
        .input(UserValidation.identifierSchema)
        .mutation(({ input }) => userController.deleteUser(input.id)),
});
