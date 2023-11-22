import Fastify from "fastify";
import * as dotenv from 'dotenv'
import { usersController } from "./controllers/users-controller.js";
import mongoose from "mongoose";
import { notFoundRoute } from "./routes/index.js";

dotenv.config();

const fastify = Fastify({ logger: true });
fastify.setNotFoundHandler(notFoundRoute.notFound);
usersController.forEach(controller => fastify.register(controller));

mongoose.connect(process.env.MONGODB_URI);
fastify.listen({ port: process.env.PORT || 3000 });