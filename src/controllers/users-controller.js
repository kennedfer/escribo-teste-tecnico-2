import { usersHooks } from "../hooks/index.js";
import { usersRoutes } from "../routes/index.js";

export const usersController = [
    (fastify, options, done) => {
        fastify.post(
            "/signup",
            {
                preHandler: [
                    usersHooks.emailIsAlreadyUsed
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
                    usersHooks.emailNotRegistered
                ],
            },
            usersRoutes.longinUser
        );
        done();
    },
    (fastify, options, done) => {
        fastify.get(
            "/user",
            {
                preHandler: [
                    usersHooks.dontHasAuthorizationHeader
                ],
            },
            usersRoutes.getUser
        );
        done();
    },
]