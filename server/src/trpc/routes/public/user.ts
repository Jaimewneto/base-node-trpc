import { router, procedure } from "../..";

import { UserController } from "@/controllers/UserController";

import { UserValidation } from "@/validation/UserValidation";

const userController = new UserController();

export const userRouter = router({
    createUser: procedure
        .input(UserValidation.createSchema)
        .mutation(({ input }) => userController.createUser(input)),
});
