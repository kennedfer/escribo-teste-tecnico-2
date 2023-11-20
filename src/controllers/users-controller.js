import { usersRoutes } from "../routes/index";

export const usersController = [
    (fastify, options, done) => {
        fastify.post(
            "/users/signup",
            {
                preHandler: [
                    // usersHooks.userEmailAlreadyExistsInDatabase
                ],
            },
            usersRoutes.signupUser
        );
        done();
    },
    (fastify, options, done) => {
        fastify.post(
            "/users/login",
            {
                preHandler: [
                    // usersHooks.userEmailExistsInDatabase
                ],
            },
            usersRoutes.longinUser
        );
        done();
    },
]