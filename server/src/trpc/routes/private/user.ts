import { router, protectedProcedure } from "../..";

import { UserController } from "@/controllers/UserController";

import { UserValidation } from "@/validation/UserValidation";
import { WhereSortValidation } from "@/validation/WhereValidation";

const userController = new UserController();

export const userRouter = router({
    getUser: protectedProcedure
        .input(UserValidation.identifierSchema)
        .query((req) => userController.findUserById(req)),

    getUsers: protectedProcedure
        .input(WhereSortValidation.WhereSortSchema || undefined)
        .query((req) => userController.findUsers(req)),

    updateUser: protectedProcedure
        .input(UserValidation.patchSchema)
        .mutation((req) => userController.updateUser(req)),

    deleteUser: protectedProcedure
        .input(UserValidation.identifierSchema)
        .mutation((req) => userController.deleteUser(req)),
});
