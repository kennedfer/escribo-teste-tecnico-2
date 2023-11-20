import { usersRoutes } from "../routes/index.js";

export const usersController = [
    (fastify, options, done) => {
        fastify.post(
            "/signup",
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
            "/login",
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