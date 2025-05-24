import { router, protectedProcedure } from "../..";

import { UserController } from "@/controllers/UserController";

import { UserValidation } from "@/validation/UserValidation";
import { WhereSortValidation } from "@/validation/WhereValidation";

import { Where } from "@/types/where";
import { User } from "@/database/schema/user";

const userController = new UserController();

export const userRouter = router({
    getUser: protectedProcedure
        .input(UserValidation.identifierSchema)
        .query((req) => userController.findUserById(req)),

    getUsers: protectedProcedure
        .input(WhereSortValidation.WhereSortSchema || undefined)
        .query(({ input }) => userController.findUsers({ where: input.where as Where<User> })),

    updateUser: protectedProcedure
        .input(UserValidation.patchSchema)
        .mutation((req) => userController.updateUser(req)),

    deleteUser: protectedProcedure
        .input(UserValidation.identifierSchema)
        .mutation(({ input }) => userController.deleteUser(input.id)),
});
